// For selection see http://openlayers.org/en/latest/examples/vector-tile-selection.html?q=vector+tile

import { Map, View } from 'ol'
import { transform as Transform } from 'ol/proj'
//import OSM from 'ol/source/OSM.js'
import { Tile as TileLayer } from 'ol/layer'

import MVT from 'ol/format/MVT'
import VectorTileLayer from 'ol/layer/VectorTile'
import VectorTileSource from 'ol/source/VectorTile'
import { Fill, Icon, Stroke, Style, Text } from 'ol/style'

import { createXYZ } from 'ol/tilegrid'
import Permalink from 'ol-ext/control/Permalink'

import 'bootstrap/dist/css/bootstrap'
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.css'
import 'ol-ext/control/Permalink.css'
import { apply, applyStyle } from 'ol-mapbox-style'

// Stored on ArcGIS.com
//const taxlotsUrl = "https://tiles.arcgis.com/tiles/l89P2qlKPxgrFDLw/arcgis/rest/services/Clatsop_DBO_taxlots_wm/VectorTileServer";
// Stored on local server
const taxlotsUrl = "http://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Hosted/WM_taxlots/VectorTileServer";

// This service has lots of stuff in it including streets, spot elevations, boundaries, creeks...
//const esriUrl = "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/";
const esriUrl = "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/";

var selection = {}; // list of selected features

const startingLocation = {
    center: Transform([-123.825, 46.181], 'EPSG:4326', 'EPSG:3857'), // astoria downtown
    zoom: 13, minZoom: 10, maxZoom: 19
};

// Let's try reading the capabilities huh???
let xyzTemplate = "/tile/{z}/{y}/{x}.pbf";

let id_property = '';
let taxlots = taxlotsUrl;
let esri = esriUrl + xyzTemplate;

/*
// ESRI vector tiles, I don't have a good style for them yet.
// The data seems pretty sketchy anyway, like it's only for proof of concept.
*/
/*let esriLayer = new VectorTileLayer({
    title: "ESRI Vector Tile Basemap",
    declutter: true,
    source: new VectorTileSource({
    	type:  'base',
    	crossOrigin: 'anonymous',
    	format: new MVT(),
    	url: esri
    }),
    visible: true,
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

var taxlotsLayer = new VectorTileLayer({
        title: 'Taxlots',
        declutter: true,
        source: new VectorTileSource({
            tilePixelRatio: 1,
            tileGrid: createXYZ({maxZoom: 19}),
        	format: new MVT(),
        	url: taxlots
    }),
    permalink: 'taxlots',
    visible: false,
    style: function(feature) {
    	var selected = !!selection[feature.get(id_property)];
        console.log("taxlots style feature");
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
*/

const mapbox_key = process.env.MAPBOX_KEY;
if (typeof mapbox_key !== 'undefined') {
    console.log("The mapbox key is defined!");
}

const mapboxBasemap = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
    	attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
                '© <a href="https://www.openstreetmap.org/copyright">' +
                'OpenStreetMap contributors</a>',
    	format: new MVT(),
    	url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' + '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
    }),
//    style: createMapboxStreetsStyle(Style, Fill, Stroke, Icon, Text)
});

const layers = [
    mapboxBasemap,
    //esriLayer, // 2019/1/17 it's doing a CORS policy error today
    //taxlotsLayer
];

const glStyle = {version:8}
let source = ''
let path = ''
let resolutions = []

let map = new Map({
    target: 'map',
    layers: layers,
    view: new View(startingLocation)
});

const styleProvider = 'https://api.mapbox.com/styles/v1/drunix/cjtl3jyvy03g31fnzt8hjkuno/wmts?access_token=pk.eyJ1IjoiZHJ1bml4IiwiYSI6ImNpZmlubjZub2JtajZzZW03ZmF5eGo0bnkifQ.4OxDk-DBg_lDLAQEJoBW_g'
apply('map', styleProvider);

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

// Adding this control is only 1/2 the story; it's not needed. If you
//   use Permalink then the URL will be rewritten to always include
//   location and layer visibility options, so that hitting refresh does
//   not cause the map to reset back to the startingLocation.

var pl_ctrl = new Permalink({
    onclick: function(url) {
	copyToClipboard(url); // Just copy the URL to the clipboard. I need a flash or highlight or something as feedback.
	//document.location = "mailto:?subject=subject&body=" + encodeURIComponent(url); // causes an email app to open with this URL in body.
    },
    urlReplace: true // Default is true; causes the URL to continuously update with the position in latlon and zoom level.
});
map.addControl(pl_ctrl);

// Copies a string to the clipboard. Must be called from within an
// event handler such as click. May return false if it failed, but
// this is not always possible. Browser support for Chrome 43+,
// Firefox 42+, Safari 10+, Edge and IE 10+.
// IE: The clipboard feature may be disabled by an administrator. By
// default a prompt is shown the first time the clipboard is
// used (per session).
function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

// That's all!
