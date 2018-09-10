// body.js

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions} from 'ol/interaction.js';
import {EsriJSON, GeoJSON} from 'ol/format.js';
import OSM from 'ol/source/OSM.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
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

const taxlotsUrl    = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Taxlots_WM/FeatureServer';
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
    })
});


var defaultStyle = {
    'Point': new Style({
	image: new CircleStyle({
	    fill: new Fill({
		color: 'rgba(0,128,128,0.5)'
	    }),
	    radius: 5,
	    stroke: new Stroke({
		color: '#ff0',
		width: 1
	    })
	})
    }),
    'LineString': new Style({
	stroke: new Stroke({
	    color: '#f00',
	    width: 3
	})
    }),
    'Polygon': new Style({
	fill: new Fill({
	    color: 'rgba(0,255,255,0.5)'
	}),
	stroke: new Stroke({
	    color: '#0ff',
	    width: 1
	})
    }),
    'MultiPoint': new Style({
	image: new CircleStyle({
	    fill: new Fill({
		color: 'rgba(255,0,255,0.5)'
	    }),
	    radius: 5,
	    stroke: new Stroke({
		color: '#f0f',
		width: 1
	    })
	})
    }),
    'MultiLineString': new Style({
	stroke: new Stroke({
	    color: '#0f0',
	    width: 3
	})
    }),
    'MultiPolygon': new Style({
	fill: new Fill({
	    color: 'rgba(0,0,255,0.5)'
	}),
	stroke: new Stroke({
	    color: '#00f',
	    width: 1
	})
    })
};

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
