// body.js

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { defaults as defaultControls, OverviewMap } from 'ol/control.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import {GPX, KML} from 'ol/format.js';
import OSM from 'ol/source/OSM.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import Feature from 'ol/Feature.js';
import EsriJSON from 'ol/format/EsriJSON.js';
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

// ==== Our taxlots service ====

var taxlotsUrl = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/Taxlots_3857/MapServer/';
var taxlotsLayer = '0';
var esrijsonFormat = new EsriJSON();

var taxlotsVectorSource = new VectorSource({
    loader: function(extent, resolution, projection) {
	
        var url = taxlotsUrl + taxlotsLayer + '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
			       extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
			       ',"spatialReference":{"wkid":102100}}') +
            '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
            '&outSR=102100';
	
        jquery.ajax({url: url, dataType: 'jsonp', success: function(response) {
            if (response.error) {
		alert(response.error.message + '\n' +
                      response.error.details.join('\n'));
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
    source: taxlotsVectorSource
});

// Styles for GPX data -------------------------------------------------

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

var styleFunction = function(feature, resolution) {
    var featureStyleFunction = feature.getStyleFunction();
    if (featureStyleFunction) {
	return featureStyleFunction.call(feature, resolution);
    } else {
	return defaultStyle[feature.getGeometry().getType()];
    }
};

// ===============================================================================

var dragAndDropInteraction = new DragAndDrop({
    formatConstructors: [
	GPX,
	KML
    ]
});

var view = new View({
/*    center: [-13784553, 5762546],
    zoom: 11,
    minZoom: 10,
    maxZoom: 19*/
    center: [0,0], zoom: 2
});

var popup = new Popup();

var map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]),
    controls: defaultControls().extend([
	new OverviewMap()
    ]),
    layers: [
	new TileLayer({
	    source: new OSM()
	}),
	taxlots_layer
    ],
    overlays: [popup.overlay],
    target: 'map',
    view: view
});

// == DRAG AND DROP ==

dragAndDropInteraction.on('addfeatures', function(event) {
    var vectorSource = new VectorSource({
	features: event.features
    });
    map.addLayer(new VectorLayer({
	source: vectorSource,
	style: styleFunction
    }));
    map.getView().fit(vectorSource.getExtent());
});

// == GPX info ==

// Look up GPX info and format it for display.
var featureInfo = function(pixel) {
    var features = [];

    // Make a list of each GPX feature found at this pixel
    map.forEachFeatureAtPixel(pixel, function(feature) {
	features.push(feature);
    });

    if (features.length > 0) {
	// Show one or many features
	var info = [];
	var i, ii;
	for (i = 0, ii = features.length; i < ii; ++i) {
	    info.push('<em>' + features[i].get('name') + '</em> ' + 
		features[i].get('desc')
	    );
	}
	info.join('<br />') || '';
    } else {
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

//    var pixel = map.getEventPixel(evt.originalEvent);
    var mycontent = featureInfo(evt.pixel);
    if (!mycontent) { return; } // nothing to see here 
    
    // Set up where the popup will pop up.
    var coordinate = evt.coordinate;
    popup.overlay.setPosition(coordinate);
    popup.container.innerHTML = mycontent;
    
    console.log('click ' + evt.coordinate);
});

console.log('body.js loaded');
