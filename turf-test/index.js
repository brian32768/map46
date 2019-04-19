import Map from 'ol/Map'
import View from 'ol/View'
import GeoJSON from 'ol/format/GeoJSON'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {fromLonLat} from 'ol/proj'
import {OSM, Vector as VectorSource} from 'ol/source'

import buffer from '@turf/buffer'

let source = new VectorSource();
/*
  fetch('data/geojson/roads-seoul.geojson').then(function(response) {
    return response.json();
  }).then(function(json) {
*/
import json from './assets/astoria.json'

const astoria_ll = [-123.834,46.187];

const vectorLayer = new VectorLayer({
    source: source
});

const rasterLayer = new TileLayer({
    source: new OSM()
});

const format = new GeoJSON();
let features = format.readFeatures(json);
for (let i=0; i < features.length; i++) {
    let feature = features[i];
    let jsonFeat = format.writeFeatureObject(feature);
    try {
        let jsonBuffered = buffer(jsonFeat, 0);
        let bufferedFeature = format.readFeature(jsonBuffered)
        source.addFeature(bufferedFeature);
        console.log(bufferedFeature);
    } catch {
        console.log("buffering failed");
    }
    //source.addFeature(feature);
}


var map = new Map({
    layers: [rasterLayer, vectorLayer],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat(astoria_ll),
      zoom: 15
    })
});
