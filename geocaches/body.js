// body.js

import { Map, View } from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import {GPX, KML} from 'ol/format.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

import Feature from 'ol/Feature.js';

// Used to show position on status bar
import {toStringHDMS} from 'ol/coordinate.js';
import {toLonLat} from 'ol/proj.js';

import {Popup} from './popup.js';
import {Geolocator} from './geolocation.js';
import {GetGPX} from './garmin.js';

import 'bootstrap/dist/js/bootstrap.min.js';
// bootstrap dependencies will pull in jquery and popper

var esri    = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

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
    center: [-13784553, 5762546],
    zoom: 11});

var popup = new Popup();

var map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]),
    layers: [
	new TileLayer({ source: new OSM() })
    ],
    overlays: [popup.overlay],
    target: 'map',
    view: view
});

// == GPS position ==

var gps_position_feature = new Feature();
gps_position_feature.setStyle(new Style({
    image: new CircleStyle({
	radius: 6,
	fill: new Fill({ color: '#3399CC' }),
	stroke: new Stroke({ color: '#fff', width: 2 })
    })
}));
var gps_accuracy_feature = new Feature();

// Add a new vector layer to the map.
var vector_layer = new VectorLayer({
    map: map,
    source: new VectorSource({
	features: [gps_accuracy_feature, gps_position_feature]
    })
});

var mylocation = new Geolocator(view, gps_position_feature, gps_accuracy_feature);

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

    var mycontent = featureInfo(evt.pixel);
    if (!mycontent) { return; } // nothing to see here 
    
    // Set up where the popup will pop up.
    var coordinate = evt.coordinate;
    popup.overlay.setPosition(coordinate);
    popup.container.innerHTML = mycontent;
    
    console.log('click ' + evt.coordinate);
});

document.getElementById('readgpx').addEventListener('click', function() {
	GetGPX();
    });

console.log('body.js loaded');
