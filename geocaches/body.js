﻿// body.js

import { Map, View } from "ol";
//import OSM from "ol/source/OSM";
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction.js';
import XYZ from "ol/source/XYZ";
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format.js';
import {Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';


var defaultStyle = {
    'Point': new Style({
	image: new CircleStyle({
	    fill: new Fill({
		color: 'rgba(255,255,0,0.5)'
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


var esri = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

var dragAndDropInteraction = new DragAndDrop({
    formatConstructors: [
	GPX,
	GeoJSON,
	IGC,
	KML,
	TopoJSON
    ]
});

var map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]),
    layers: [
	new TileLayer({
            source: new XYZ({
                attributions: 'Tiles © <a href="' + esri + service + '/MapServer">ArcGIS</a>',
                url: esri + service + '/MapServer/tile/{z}/{y}/{x}'
            })
	})
    ],
    target: 'map',
    view: new View({
        center: [-13775000, 5768000],
        zoom: 11
    })
});


dragAndDropInteraction.on('addfeatures', function(event) {
    var vectorSource = new VectorSource({
	features: event.features
    });
    map.addLayer(new VectorLayer({
	source: vectorSource,
	style: styleFunction
    }));
    map.getView().fit(vectorSource.getExtent());
    console.log('dragAndDrop addfeatures');
});


var displayFeatureInfo = function(pixel) {
    var features = [];
    map.forEachFeatureAtPixel(pixel, function(feature) {
	features.push(feature);
    });
    if (features.length > 0) {
	var info = [];
	var i, ii;
	for (i = 0, ii = features.length; i < ii; ++i) {
	    info.push(features[i].get('name'));
	}
	document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
    } else {
	document.getElementById('info').innerHTML = '&nbsp;';
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
