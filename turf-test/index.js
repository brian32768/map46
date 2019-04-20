import Map from 'ol/Map'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {fromLonLat} from 'ol/proj'
import {OSM, Vector as VectorSource} from 'ol/source'
// jsonp avoids CORS problems
import jsonp from 'jsonp'
import buffer from '@turf/buffer'
import { toMercator, toWgs84 } from '@turf/projection'

let source = new VectorSource();
/*
  fetch('data/geojson/roads-seoul.geojson').then(function(response) {
    return response.json();
  }).then(function(json) {
*/

const astoria_ll = [-123.830,46.183];

const buildings_url = "https://geoserver.wildsong.biz/geoserver/clatsop_wm/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=clatsop_wm%3Abuildings_exported&outputFormat=text%2Fjavascript";
const vectorLayer = new VectorLayer({
    source: source
});
const format = new GeoJSON();
jsonp(buildings_url, { name:"parseResponse", timeout:60000 },
    (err, json) => {
        if (err) {
            console.log("Could not read building data from", buildings_url);
        } else {
            let features = format.readFeatures(json);
            source.addFeatures(features);
            for (let i=0; i < features.length; i++) {
                let feature = features[i];
                let jsonFeat = format.writeFeatureObject(feature); // to GeoJSON
                let jsonWgs84 = toWgs84(jsonFeat);
                try {
                    let jsonBuffered = buffer(jsonWgs84, 10, {"units":"meters"});
                    let jsonWM = toMercator(jsonBuffered);
                    let bufferedFeature = format.readFeature(jsonWM) // to Feature
                    source.addFeature(bufferedFeature);
                    //console.log(i, feature.getGeometry(), bufferedFeature.getGeometry());
                } catch {
                    // I got this error a lot before I figured out everything in Turf has to be in WGS84
                    console.log("buffering failed", i);
                }
            }
        }
    }
);
const rasterLayer = new TileLayer({
    source: new OSM()
});

var map = new Map({
    layers: [rasterLayer, vectorLayer],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat(astoria_ll),
      zoom: 16
    })
});
