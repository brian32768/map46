// body.js

import { Map, View } from 'ol';
import Overlay from 'ol/Overlay.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import {GPX, KML} from 'ol/format.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';

import Feature from 'ol/Feature.js';
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';

import 'bootstrap/dist/js/bootstrap.min.js';
// bootstrap will pull in jquery and popper

var esri = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

// Popup stuff ---------------------------------------------------------

// Elements that make up the popup.
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

//
// Create an overlay to anchor the popup to the map.
//
var popup_overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

//
// Add a click handler to hide the popup.
// @return {boolean} Don't follow the href.
//
closer.onclick = function() {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};


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

var map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]),
    layers: [
	new TileLayer({ source: new OSM() })
    ],
    overlays: [popup_overlay],
    target: 'map',
    view: view
});

// == GEOLOCATION ==

var geolocation = new Geolocation({
    trackingOptions : { enableHighAccuracy: true },
    projection : view.getProjection()
});

function el(id) {
    return document.getElementById(id);
}

el('track').addEventListener('change', function() {
    geolocation.setTracking(this.checked);
});

// update the HTML page when the position changes.
geolocation.on('change', function() {
    el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
    el('altitude').innerText = geolocation.getAltitude() + ' [m]';
    el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
    el('heading').innerText = geolocation.getHeading() + ' [rad]';
    el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
});

// handle geolocation error.
geolocation.on('error', function(error) {
    var info = document.getElementById('gpsinfo');
    info.innerHTML = error.message;
    info.style.display = '';
});

var accuracyFeature = new Feature();
geolocation.on('change:accuracyGeometry', function() {
    accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new Feature();
positionFeature.setStyle(new Style({
    image: new CircleStyle({
	radius: 6,
	fill: new Fill({
	    color: '#3399CC'
	}),
	stroke: new Stroke({
	    color: '#fff',
	    width: 2
	})
    })
}));

geolocation.on('change:position', function() {
    var coordinates = geolocation.getPosition();
    positionFeature.setGeometry(coordinates ?
				new Point(coordinates) : null);
    view.setCenter(coordinates);
    console.log('updated position', coordinates);
});

new VectorLayer({
    map: map,
    source: new VectorSource({
	features: [accuracyFeature, positionFeature]
    })
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


//
// Show information about a GPX feature when the mouse rolls over it
//
var displayFeatureInfo = function(pixel) {
    var features = [];
    map.forEachFeatureAtPixel(pixel, function(feature) {
	features.push(feature);
    });

    if (features.length > 0) {
	// Show many features
	var info = [];
	var i, ii;
	for (i = 0, ii = features.length; i < ii; ++i) {
	    info.push('<em>' + features[i].get('name') + '</em> ' + 
		features[i].get('desc')
	    );
	}
	document.getElementById('mapinfo').innerHTML = info.join(', ') || '&nbsp';
    } else {
	// Show just one feature
	document.getElementById('mapinfo').innerHTML = '&nbsp;';
    }
};

map.on('pointermove', function(evt) {
    if (evt.dragging) {
	return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('click', function(evt) {
    displayFeatureInfo(evt.pixel);
    console.log('click');
});




console.log('body.js loaded');
