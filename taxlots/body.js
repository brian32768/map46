// body.js

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {EsriJSON, GeoJSON} from 'ol/format.js';
import OSM from 'ol/source/OSM.js';
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import Feature from 'ol/Feature.js';
import {tile as tileStrategy} from 'ol/loadingstrategy.js';
import VectorSource from 'ol/source/Vector.js';
import XYZ from 'ol/source/XYZ.js';
import {createXYZ} from 'ol/tilegrid.js';

import jquery from 'jquery/dist/jquery.min.js';

// Used to show position on status bar
import {toStringHDMS} from 'ol/coordinate.js';
import {toLonLat} from 'ol/proj.js';

import {Popup} from './popup.js';
//import {geojson} from './geojson.js';

import 'bootstrap/dist/js/bootstrap.min.js';
// bootstrap dependencies will pull in jquery and popper

var esri    = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

// ==== Our Clatsop services ====

const buildingUrl   = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/buildings_microsoft/FeatureServer';
var buildingLayer = '0'; // clatsop_buildings

const taxlotsUrl    = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/FeatureServer';
var taxlotsLayer  = '0';

var geojsonFormat = new GeoJSON();
var esrijsonFormat = new EsriJSON();

var buildingVectorSource = new VectorSource({
    loader: function(extent, resolution, projection) {
	
        var url = buildingUrl + '/' + buildingLayer + '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent(  '{"xmin":' + extent[0] + ',"ymin":' + extent[1]
				 + ',"xmax":' + extent[2] + ',"ymax":' + extent[3]
				 + ',"spatialReference":{"wkid":3857}}')
            + '&geometryType=esriGeometryEnvelope&inSR=2913&outFields=*'
	    + '&outSR=3857';
	
        jquery.ajax({url: url, dataType: 'jsonp', success: function(response) {
            if (response.error) {
		console.log(response.error.message + response.error.details + ' IS IT SHARED?');
            } else {
		// dataProjection will be read from document
		var features = esrijsonFormat.readFeatures(response, {
                    featureProjection: projection
		});
		if (features.length > 0) {
                    buildingVectorSource.addFeatures(features);
		}
            }
        }});
    },
    strategy: tileStrategy(createXYZ({
        tileSize: 512
    }))
});

var building_layer = new VectorLayer({
    source: buildingVectorSource
});

var taxlotsVectorSource = new VectorSource({
    loader: function(extent, resolution, projection) {
	
        var url = taxlotsUrl + '/' + taxlotsLayer + '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent(  '{"xmin":' + extent[0] + ',"ymin":' + extent[1]
			       + ',"xmax":' + extent[2] + ',"ymax":' + extent[3]
			       + ',"spatialReference":{"wkid":3857}}')
            + '&geometryType=esriGeometryEnvelope&inSR=3857&outFields=*'
            + '&outSR=3857';
	
        jquery.ajax({url: url, dataType: 'jsonp', success: function(response) {
            if (response.error) {
		console.log('taxlots error' + response.error.message + response.error.details);
            } else {
		// dataProjection will be read from document
		var features = esrijsonFormat.readFeatures(response, {
                    featureProjection: projection
		});
		if (features.length > 0) {
                    taxlotsVectorSource.addFeatures(features);
		}
            }
        }});
    },
    strategy: tileStrategy(createXYZ({
        tileSize: 512
    }))
});

var openSansAdded = false;

var myDom = {
    polygons: {
        text: 'normal',
        align: '',
        baseline: 'Middle',
        rotation: 0,
        font: 'Arial',
        weight: 'Normal',
        placement: 'Point',
        maxangle: 0,
        overflow: '',
        size: '24px',
        offsetX: 0,
        offsetY: 0,
        color: 'black',
        outline: 'white',
        outlineWidth: 2,
        maxreso: 1200,
    }
};

var getText = function(feature, resolution, dom) {
    var type = dom.text.value;
    var maxResolution = dom.maxreso.value;
    var text = feature.get('Taxlot');

    if (resolution > maxResolution) {
        text = '';
    } else if (type == 'hide') {
        text = '';
    } else if (type == 'shorten') {
        text = text.trunc(12);
    } else if (type == 'wrap' && (!dom.placement || dom.placement.value != 'line')) {
        text = stringDivider(text, 16, '\n');
    }

    return text;
};

var createTextStyle = function(feature, resolution, dom) {
    var align = dom.align.value;
    var baseline = dom.baseline.value;
    var size = dom.size.value;
    var offsetX = parseInt(dom.offsetX.value, 10);
    var offsetY = parseInt(dom.offsetY.value, 10);
    var weight = dom.weight.value;
    var placement = dom.placement ? dom.placement.value : undefined;
    var maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
    var overflow = dom.overflow ? (dom.overflow.value == 'true') : undefined;
    var rotation = parseFloat(dom.rotation.value);
    if (dom.font.value == '\'Open Sans\'' && !openSansAdded) {
        var openSans = document.createElement('link');
        openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
        openSans.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(openSans);
        openSansAdded = true;
    }
    var font = weight + ' ' + size + ' ' + dom.font.value;
    var fillColor = dom.color.value;
    var outlineColor = dom.outline.value;
    var outlineWidth = parseInt(dom.outlineWidth.value, 10);

    return new Text({
        textAlign: align == '' ? undefined : align,
        textBaseline: baseline,
        font: font,
        text: getText(feature, resolution, dom),
        fill: new Fill({color: fillColor}),
        stroke: new Stroke({color: outlineColor, width: outlineWidth}),
        offsetX: offsetX,
        offsetY: offsetY,
        placement: placement,
        maxAngle: maxAngle,
        overflow: overflow,
        rotation: rotation
    });
};


var taxlots_layer = new VectorLayer({
    source: taxlotsVectorSource,
    style: new Style({
	fill: new Fill({
	    color: 'rgba(200,200,200,0.10)' // If there is no fill then clicks won't get caught.
	}),
	stroke: new Stroke({
	    color: "#ff0000", // see https://gis.stackexchange.com/questions/132607/how-to-change-color-of-a-layer-in-openlayers#132608
	    width: 1
	})
        text: createTextStyle(feature, resolution, myDom.polygons)
    })
});


// ===============================================================================

var view = new View({
    center: [-13799309, 5765712],
    zoom: 15,
    minZoom: 10,
    maxZoom: 19
//    center: [0,0], zoom: 2
});

var popup = new Popup();

var map = new Map({
    controls: defaultControls().extend([
	new OverviewMap()
    ]),
    layers: [
	new TileLayer({
	    source: new OSM()
	}),
	taxlots_layer,
	building_layer
    ],
    overlays: [popup.overlay],
    target: 'map',
    view: view
});

// Look up info and format it for display.
var featureInfo = function(pixel) {
    var features = [];

    map.forEachFeatureAtPixel(pixel, function(feature) {
	features.push(feature);
	console.log("found " + feature);
    });

    if (features.length > 0) {
	// Show one or many features
	var info = [];
	var i, ii;
	for (i = 0, ii = features.length; i < ii; ++i) {
	    var attribute_names = Object.keys(features[i].values_);
	    var taxlot = features[i].get('Taxlot');
	    if (taxlot) {
		info.push('<em>Taxlot ' + taxlot + '</em> <br />' + 
			  features[i].get('ORTaxlot'));
	    } else {
		console.log(attribute_names);
	    }
	}
	info.join('<br />') || '';
    } else {
	console.log('no feature here');
	info = '';
    }
    return info;
}

// Install event handlers

/*
The reason this is turned off is that when you click a dot near the top of the map,
it cause a scroll which then immediately fires this event. Fix somehow?? A counter??
map.on('movestart', function(evt) {
if the popup is open, increment counter
if counter is > 1 then
    popup.close();
});
*/

map.on('pointermove', function(evt) {
    // Handler for the map cursor
    if (evt.dragging) {	return; }

    var coordinate = evt.coordinate;
    var latlon = toStringHDMS(toLonLat(coordinate));
    document.getElementById('cursor_position').innerHTML = latlon;
});

map.on('click', function(evt) {
    // Handler for click events on map.

//  var pixel = map.getEventPixel(evt.originalEvent);
    var pixel = evt.pixel;
//    console.log('pixel ' + pixel);
    var mycontent = featureInfo(pixel);
    if (!mycontent) { return; } // nothing to see here 
    
    // Set up where the popup will pop up.
    var coordinate = evt.coordinate;
    popup.overlay.setPosition(coordinate);
    popup.container.innerHTML = mycontent;
    
    console.log('click ' + evt.coordinate);
});

console.log('body.js loaded');
