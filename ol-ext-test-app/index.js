import 'bootstrap/dist/css/bootstrap'
import "ol/ol.css"
import "ol-ext/dist/ol-ext.css"
//import "ol-ext/control/GeoBookmark.css"
//import "ol-ext/control/LayerSwitcher.css"
//import "ol-ext/control/Permalink.css"

import {Map, View} from "ol"
import {transform as Transform} from 'ol/proj'
import {Tile as TileLayer, Image as ImageLayer, Vector as VectorLayer} from "ol/layer"
import {OSM, Stamen, TileArcGISRest, ImageArcGISRest, Vector as VectorSource} from 'ol/source'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import XYZ from 'ol/source/XYZ'
import {createXYZ} from 'ol/tilegrid'
import {Group as LayerGroup} from 'ol/layer'

import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style'
import Feature from 'ol/Feature'
import {EsriJSON} from 'ol/format'
import GeoJSON from 'ol/format/GeoJSON'

import "bootstrap/dist/js/bootstrap"
import jquery from 'jquery/dist/jquery'

import {defaults as defaultControls, ScaleLine} from 'ol/control'

// ol-ext stuff
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Permalink from 'ol-ext/control/Permalink'
import {Bookmarks} from "./bookmarks"

import {OverviewMap as Overview} from 'ol/control'

var esrijsonFormat = new EsriJSON();

// ========================================================================

const oid_name = 'OBJECTID';
var selection = {}; // list of selected features

var taxlots         = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Taxlots/FeatureServer/';
var taxlotsLabels   = taxlots + '0';
var taxlotsFeatures = taxlots + '1';
//var taxlotsMapServer = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/MapServer';

var zoning          = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Zoning/FeatureServer/';
var zoning_boundaries    = zoning + '3';
var zoning_commercial    = zoning + '4';
var zoning_noncommercial = zoning + '5';
var zoning_residential   = zoning + '6';

var world_imagery = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
var hillshade     = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/BareEarthHS/ImageServer";

// ========================================================================

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


var zoning_feature_layers = new LayerGroup({
    'title': 'Zoning',
    layers: [
	new VectorLayer({
	    title: 'Boundaries',
	    source: makeVectorSource(zoning_boundaries)
	}),
	new VectorLayer({
	    title: 'Commercial',
	    source: makeVectorSource(zoning_commercial)
	}),
	new VectorLayer({
	    title: 'Noncommercial',
	    source: makeVectorSource(zoning_noncommercial)
	}),
	new VectorLayer({
	    title: 'Residential',
	    source: makeVectorSource(zoning_residential)
	})
    ],
    visible: true,
    opacity: 0.5,
    maxResolution: 100,
    zindex: 1
});

var hillshade_layer = new ImageLayer({
    title: 'Hillshade',
    type: 'base',
    source: new ImageArcGISRest({ url: hillshade,
				  params: {},
				  crossOrigin: 'anonymous',
				  ratio: 1
				}),
    maxResolution: 200,
    visible: true
});

var world_imagery_layer = new ImageLayer({
    title: 'World Imagery',
    type: 'base',
    source: new ImageArcGISRest({ url: world_imagery,
				  params: {},
				  crossOrigin: 'anonymous',
				  ratio: 1
				}),
    maxResolution: 200,
    visible: false
});

const streetsLayer = new TileLayer({
	title: 'Streets',
	type: 'base',
 	source: new OSM(),
	crossOrigin: 'anonymous',
	opacity: 0.7,
	visible: true
});
const tonerLayer = new TileLayer({
	title: 'Toner',
	type: 'base',
 	source: new Stamen({
        layer: 'toner',
    }),
	crossOrigin: 'anonymous',
    opacity: 0.5,
	visible: true
});

var taxlotsLabelLayer = new VectorLayer({
    title: "Taxlot numbers",
    declutter: true,
    source: new VectorSource({
	format: new GeoJSON(),
	url:    taxlotsLabels
    }),
    style: function(feature) {
	style.getText().setText(feature.get('Taxlot'));
	return style;
    }
});

var taxlots_polygon_style = function(feature) {
    var selected = !!selection[feature.get(oid_name)];
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

const taxlotsFeatureLayer = new VectorLayer({
    title: "Taxlot polygons",
    source: makeVectorSource(taxlotsFeatures),
    maxResolution: 25, zindex:0,
    style: taxlots_polygon_style
});

/*
var taxlots_mapserver_layer = new TileLayer({
 	title: 'Taxlots',
	source: new TileArcGISRest({ url: taxlots    })
});
*/


const layers = [
    hillshade_layer,
    world_imagery_layer,
    streetsLayer,
    zoning_feature_layers,
    taxlotsFeatureLayer,
    taxlotsLabelLayer
];
const overviewLayers = [
    tonerLayer,
];

var layercount = layers.length;
for (var i = 0; i < layercount; i++) {
    var layer = layers[i];
    console.log("Layer ", layer.getMinResolution(), layer.getMaxResolution());
}

const map = new Map({
    target: 'map',
    layers: layers,
    attributions: ['DOGAMI'],
    view: new View({
        center: Transform([-123.9, 46.2], 'EPSG:4326', 'EPSG:3857'),
        zoom: 12
    }),
    controls: defaultControls({
    	attributionOptions: {
    	    collapsible: false // show them all the time vs show [i].
    	}
    })
});

// ==================== ADD CONTROLS ====================

const overview = new Overview({
    collapsed: false,
    collapsible: false,
    layers: overviewLayers,
    //view: new View({    }),
});
overview.setTarget("overview"); // settings as an attribute does not work
map.addControl(overview);

const layerswitcher = new LayerSwitcher({
    tipLabel: 'Legend' //optional label for button
});
map.addControl(layerswitcher);

const scaleline = new ScaleLine();
scaleline.setUnits("us");
map.addControl(scaleline);

map.addControl(Bookmarks());

const pl_ctrl = new Permalink({
    onclick: function(url) {
        console.log("Permalink url = ", url);
	    document.location = "mailto:?subject=subject&body=" + encodeURIComponent(url); // causes an email app to open with this URL in body.
    },
    urlReplace: true // Default is true; causes the URL to continuously update with the position in latlon and zoom level.
});
map.addControl(pl_ctrl);

const imgbtn = document.getElementById("imagery_button");
imgbtn.addEventListener("click", toggleImagery);

function toggleImagery(evt) {
    const streetsVisible = streetsLayer.getVisible();
    if (streetsVisible) {
        streetsLayer.setVisible(false);
        world_imagery_layer.setVisible(true);
        hillshade_layer.setVisible(false);
        imgbtn.innerText = "streets";
    } else {
        streetsLayer.setVisible(true);
	    world_imagery_layer.setVisible(false);
	    imgbtn.innerText = "aerial";
    }
}

//var selectElement = document.getElementById('type'); // singleselect | multiselect

map.on('click', function(event) {
    var features = map.getFeaturesAtPixel(event.pixel);
    if (!features) {
        selection = {}; // clear selection
        // force redraw of layer style
        taxlotsFeatureLayer.setStyle(taxlotsFeatureLayer.getStyle());
	    console.log("Nothing here, feature(s) deselected!");
        return;
    }

    /*
    var i = 0;
    for (let f of features) {
	console.log("Feature " + i + ":" + f.getGeometry())
	i++;
    }
    */

    var feature = features[0];
    var properties = feature.getProperties();

    console.log('properties: ', properties);

    var oid = feature.get(oid_name);
    console.log('OID: ', oid);

//    if (selectElement.value === 'singleselect') {
        selection = {};
//    }

    selection[oid] = feature;

    // force redraw of layer style
    taxlotsFeatureLayer.setStyle(taxlotsFeatureLayer.getStyle());

});
