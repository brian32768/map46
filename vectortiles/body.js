// body.js (vectortiles)
//
// For selection see http://openlayers.org/en/latest/examples/vector-tile-selection.html?q=vector+tile

import {Map, View} from 'ol';
import {transform as Transform} from 'ol/proj';
import OSM from 'ol/source/OSM.js';
import {Tile as TileLayer} from 'ol/layer';

import MVT from 'ol/format/MVT.js';
import VectorTile from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

import createMapboxStreetsStyle from './mapboxstyles.js';

// Copied from ArcGIS.com
const taxlotsUrl = "https://tiles.arcgis.com/tiles/l89P2qlKPxgrFDLw/arcgis/rest/services/Clatsop_DBO_taxlots_wm/VectorTileServer";

var selection = {}; // list of selected features

const startingLocation = {
    center: Transform([-123.825, 46.181], 'EPSG:4326', 'EPSG:3857'), // astoria downtown
    zoom: 13, minZoom: 10, maxZoom: 19
}; 

var osmStreetsLayer  = new TileLayer({
    title: 'Streets',
    type: 'base',
    source: new OSM(),
    crossOrigin: 'anonymous',
    opacity: 1,
    permalink: 'Streets',
    visible: true,
    zindex: 3
});

var id_property = '';
var taxlots = taxlotsUrl + "/tile/{z}/{y}/{x}.pbf";

var taxlotsLayer = new VectorTile({
    declutter: true,
    source: new VectorTileSource({
	format: new MVT(),
	url: taxlots
    }),
    style: function(feature) {
	var selected = !!selection[feature.get(id_property)];
	return new Style({
	    stroke: new Stroke({
		color: selected? 'rgba(200,20,20, 0.8)' : 'rgba(20,20,20, 0.7)',
		width: selected? 1 : 0.5
	    }),
	    fill: new Fill({
		color: selected? 'rgba(100,20,20, 0.5)' : 'rgba(20,20,20,0.1)'
	    })
	});
    }
});

import {mapbox_key} from "./keys.js";
var mapboxBasemap = new VectorTile({
    declutter: true,
    source: new VectorTileSource({
	attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
	format: new MVT(),
	url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' + '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
    }),
    style: createMapboxStreetsStyle(Style, Fill, Stroke, Icon, Text)
});

/*
var esriBasemap = new VectorTile({
    source: new VectorTileSource({
	title: 'ESRI World Basemap',
	type:  'base',
	crossOrigin: 'anonymous',
	format: new MVT(),
	url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf',
    })
//    style: createMapboxStreetsStyle(Style, Fill, Stroke, Icon, Text)
});
*/

/*
var maptilerContourLayer = new VectorTile({
    source: new VectorTileSource({
	title: 'Contours',
	type:  'base',
	crossOrigin: 'anonymous',
	format: new MVT(),
	url: "https://maps.tilehosting.com/data/contours/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5"
    }),
    style: function(feature) {
	return new Style({
	    stroke: new Stroke({
		color: 'rgba(194,144,27,50)',
		width: 1
	    })
	});
    }
});
*/

/*
var maptilerBasemap = new VectorTile({
    source: new VectorTileSource({
	title: 'Mapbox',
	type:  'base',
	crossOrigin: 'anonymous',
	format: new MVT(),
	url: "https://maps.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5"
    }),
    style: createMapboxStreetsStyle(Style, Fill, Stroke, Icon, Text)
});
*/

var layers = [
    //osmStreetsLayer,
    //maptilerBasemap,
    //esriBasemap
    mapboxBasemap,
    //maptilerContourLayer,
    taxlotsLayer
];

var map = new Map({
    target: 'map',
    layers: layers,
    view: new View(startingLocation)
});

//var selectElement = document.getElementById('type'); // singleselect | multiselect


map.on('click', function(event) {
    var features = map.getFeaturesAtPixel(event.pixel);
    if (!features) {
        selection = {}; // clear selection
        // force redraw of layer style
        taxlotsLayer.setStyle(taxlotsLayer.getStyle());
	console.log("Nothing here, feature(s) deselected!");
        return;
    }
    var i = 0;
    for (let f of features) {
	console.log("Feature " + i + ":" + f.getGeometry())
	i++;
    }
    var feature = features[0];
    var properties = feature.getProperties();
    console.log('properties: ', JSON.stringify(properties,null,2));

    var fid = feature.get(id_property);

//    if (selectElement.value === 'singleselect') {
        selection = {};
//    }

    selection[fid] = feature;

    // force redraw of layer style
    taxlotsLayer.setStyle(taxlotsLayer.getStyle());
});
