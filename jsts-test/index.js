import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';
import OSM from 'ol/source/OSM.js';
import VectorSource from 'ol/source/Vector.js';
import LinearRing from 'ol/geom/LinearRing.js';
import {Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon} from 'ol/geom.js';

const jsts = require('jsts');

var source = new VectorSource();

// This is GeoJSON
// I had to rename it so that parcel would bundle it correctly
import json from './assets/coxcomb.json'

const astoria_ll = [-123.834,46.187];
const url="https://geoserver.wildsong.biz/geoserver/clatsop_wm/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=clatsop_wm%3Abuildings&cql_filter=housenumber=1556&outputFormat=application%2Fjson"

var format = new GeoJSON();
var features = format.readFeatures(json, {featureProjection: 'EPSG:3857'});

var parser = new jsts.io.OL3Parser();
parser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);

for (var i = 0; i < features.length; i++) {
  var feature = features[i];
  // convert the OpenLayers geometry to a JSTS geometry
  var jstsGeom = parser.read(feature.getGeometry());

  // create a buffer of 40 meters around each feature
  var buffered = jstsGeom.buffer(40);

  // convert back from JSTS and replace the geometry on the feature
  feature.setGeometry(parser.write(buffered));
}

source.addFeatures(features);

var vectorLayer = new VectorLayer({
    source: source
});

var rasterLayer = new TileLayer({
    source: new OSM()
});

var map = new Map({
    layers: [rasterLayer, vectorLayer],
    target: document.getElementById('map'),
    view: new View({
      center: fromLonLat(astoria_ll),
      zoom: 15
    })
});
