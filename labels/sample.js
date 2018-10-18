import {Map, View} from 'ol';
import {getCenter} from 'ol/extent.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import BingMaps from 'ol/source/BingMaps.js';
import VectorSource from 'ol/source/Vector.js';
import {Fill, Style, Text} from 'ol/style.js';
import OSM from 'ol/source/OSM.js';

var style = new Style({
    text: new Text({
        font: 'bold 24px "Open Sans", "Arial Unicode MS", "sans-serif"',
        placement: 'line',
        fill: new Fill({
            color: 'black'
        })
    })
});

// Conventional raster tile streets layer, for testing.
var osmStreetsLayer  = new TileLayer({
    source: new OSM(),
    crossOrigin: 'anonymous',
    opacity: 1,
    visible: true,
});

var viewExtent = [1817379, 6139595, 1827851, 6143616];
var map = new Map({
    layers: [
	osmStreetsLayer,
	new VectorLayer({
            declutter: true,
            source: new VectorSource({
		format: new GeoJSON(),
		url: './vienna-streets.geojson'
            }),
            style: function(feature) {
		style.getText().setText(feature.get('name'));
		return style;
            }
	})
    ],
    target: 'map',
    view: new View({
        extent: viewExtent,
        center: getCenter(viewExtent),
        zoom: 17,
        minZoom: 14
    })
});

console.log('onward!');
