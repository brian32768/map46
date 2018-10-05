// body.js

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {EsriJSON} from 'ol/format.js';
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

import 'bootstrap/dist/js/bootstrap.min.js';
// bootstrap dependencies will pull in jquery and popper

var esri    = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

// ==== Our Clatsop services ====

const building_url            = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/buildings_microsoft/FeatureServer/0';
const taxlots_url             = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/FeatureServer/0';
const zones_boundaries_url    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Boundaries/MapServer/0"

const zones_commercial_url    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Commercial/MapServer/0"

const zones_noncommercial_url = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Noncommercial/MapServer/0"
const zones_residential_url   = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Residential/MapServer/0"



var esrijsonFormat = new EsriJSON();

function makeVectorSource(my_url) {
    /* I assume that all the data is projected into Web Mercator here. */
    
    var source = new VectorSource({
	loader: function(extent, resolution, projection) {
//	    console.log("extent:", extent);
//	    console.log("resolution:", resolution);
//	    console.log("projection:", projection); 
        var url = my_url + '/' + '/query/?f=json&' +
	    'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
	    encodeURIComponent(    '{"xmin":' + extent[0] + ',"ymin":' + extent[1]
				 + ',"xmax":' + extent[2] + ',"ymax":' + extent[3])
	    + '&geometryType=esriGeometryEnvelope&outFields=*';
	    
        jquery.ajax({url: url, dataType: 'jsonp', success: function(response) {
	    if (response.error) {
		console.log(response.error.message + response.error.details + ' IS IT SHARED? I can\'t do auth!');
	    } else {
		// dataProjection will be read from document
		var features = esrijsonFormat.readFeatures(response, {
		    featureProjection: projection
		});
		if (features.length > 0) {
		    source.addFeatures(features);
		}
	    }
        }});
    },
    strategy: tileStrategy(createXYZ({ tileSize: 512 }))
    });
    return source;
}

var openSansAdded = false;

var myDom = {
    polygons: {
        text: 'normal',
        align: 'center',
        baseline: 'middle',
        rotation: 0,
        font: 'arial',
        weight: 'normal',
        placement: 'point',
        maxangle: '0',
        overflow: '',
        size: '12px',
        offsetX: '0',
        offsetY: '0',
        color: '#000',
        outline: '#fff',
        outlineWidth: '2',
        maxreso: 3,
    }
};

var getText = function(feature, resolution, dom) {
    var type = dom.text;
    var maxResolution = dom.maxreso;
    var text = feature.get('OBJECTID');

//    if (resolution > maxResolution) {
//	console.log(resolution, maxResolution);
//        text = '';
//    }
//    } else if (type == 'hide') {
//        text = '';
//    } else if (type == 'shorten') {
//        text = text.trunc(12);
//    } else if (type == 'wrap' && (!dom.placement || dom.placement.value != 'line')) {
//        text = stringDivider(text, 16, '\n');
//    }

    return text;
};

var createTextStyle = function(feature, resolution, dom) {
    var align     = dom.align;
    var baseline  = dom.baseline;
    var size      = dom.size;
    var offsetX   = parseInt(dom.offsetX, 10);
    var offsetY   = parseInt(dom.offsetY, 10);
    var weight    = dom.weight;
    var placement = dom.placement ? dom.placement : undefined;
    var maxAngle  = dom.maxangle ? parseFloat(dom.maxangle) : undefined;
    var overflow  = dom.overflow ? (dom.overflow == 'true') : undefined;
    var rotation  = parseFloat(dom.rotation);

    if (dom.font == '\'Open Sans\'' && !openSansAdded) {
        var openSans = document.createElement('link');
        openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
        openSans.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(openSans);
        openSansAdded = true;
    }
    var font = weight + ' ' + size + ' ' + dom.font;
    var fillColor = dom.color;
    var outlineColor = dom.outline;
    var outlineWidth = parseInt(dom.outlineWidth, 10);
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

function taxlot_style(feature, resolution) {
    // see https://gis.stackexchange.com/questions/132607/how-to-change-color-of-a-layer-in-openlayers#132608
    return new Style({
	// If there is no fill defined then clicks won't get caught in our polygons.
	fill: new Fill({
	    color: 'rgba(200,200,200,0.10)'
	}),
	stroke: new Stroke({
	    color: "#ff0000", 
	    width: 1
	}),
        text: createTextStyle(feature, resolution, myDom.polygons)
    });
}

function zone_style(feature, resolution) {
    // see https://gis.stackexchange.com/questions/132607/how-to-change-color-of-a-layer-in-openlayers#132608
    return new Style({
	// If there is no fill defined then clicks won't get caught in our polygons.
	fill: new Fill({
	    color: 'rgba(200,100,100,0.50)'
	}),
	stroke: new Stroke({
	    color: "#ff8080", 
	    width: 1
	}),
        text: createTextStyle(feature, resolution, myDom.polygons)
    });
}

// ===============================================================================

var building_layer = new VectorLayer({    source: makeVectorSource(building_url) });

var zones_boundaries_layer = new VectorLayer({source: makeVectorSource(zones_boundaries_url) });
var zones_commercial_layer = new VectorLayer({source: makeVectorSource(zones_commercial_url) });
var zones_noncommercial_layer = new VectorLayer({source: makeVectorSource(zones_noncommercial_url) });
var zones_residential_layer = new VectorLayer({source: makeVectorSource(zones_residential_url) });

var taxlots_layer = new VectorLayer({
    source: makeVectorSource(taxlots_url),
    style:  taxlot_style
});

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

	zones_boundaries_layer,
	zones_commercial_layer,
	zones_noncommercial_layer,
	zones_residential_layer,
	
	//building_layer,
	//taxlots_layer
	// last layer is drawn at top
    ],
    overlays: [popup.overlay],
    target: 'map',
    view: view
});

// Look up info and format it for display in a popup.
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
	    var f = features[i].get('Zone');
	    if (f) {
		info.push('<em>Zone ' + f + '</em> <br />'
			  + attribute_names
			 );
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

    var mycontent = featureInfo(pixel);
    if (!mycontent) { return; } // nothing to see here 
    
    // Set up where the popup will pop up.
    var coordinate = evt.coordinate;
    popup.overlay.setPosition(coordinate);
    popup.container.innerHTML = mycontent;
//    console.log('click ' + evt.coordinate);
});

map.on('moveend', function(evt) {
    var z = view.getZoom();
    var r = view.getResolution();
    //console.log('moveend zoom ' + z + ' res ' + r);
});

console.log('body.js loaded');
