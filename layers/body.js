// layers/body.js
//

import {Map, View} from "ol";
import {transform as Transform} from 'ol/proj';
import {Tile as TileLayer, Image as ImageLayer, Vector as VectorLayer} from "ol/layer";
import {OSM, TileArcGISRest, ImageArcGISRest, Vector as VectorSource} from 'ol/source';
import {tile as tileStrategy} from 'ol/loadingstrategy.js';
import XYZ from 'ol/source/XYZ.js';
import {createXYZ} from 'ol/tilegrid.js';
import {Group as LayerGroup} from 'ol/layer';

import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js';
import Feature from 'ol/Feature.js';
import {EsriJSON} from 'ol/format.js';

import "bootstrap/dist/js/bootstrap.js";
import jquery from 'jquery/dist/jquery.min.js';

import LayerSwitcher from 'ol-ext/control/LayerSwitcher.js';
import {defaults as defaultControls, ScaleLine} from 'ol/control.js';

import {Bookmarks} from "./bookmarks.js";

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

//var taxlots       = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/FeatureServer/0';
var taxlots       = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/MapServer';

var commercial    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Commercial/MapServer";
var noncommercial = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Noncommercial/MapServer";
var boundaries    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Boundaries/MapServer";
var residential   = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Residential/MapServer";

var hillshade     = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/BareEarthHS/ImageServer";

var zoning_layers = new LayerGroup({
    'title': 'Zoning',
    layers: [
	new TileLayer({
	    title: 'Commercial',
	    source: new TileArcGISRest({ url: commercial    })
	}), 
	new TileLayer({
	    title: 'Noncommercial',
	    source: new TileArcGISRest({ url: noncommercial })
	}), 
	new TileLayer({
	    title: 'Boundaries',
	    source: new TileArcGISRest({ url: boundaries    })
	}), 
	new TileLayer({
	    title: 'Residential',
	    source: new TileArcGISRest({ url: residential   })
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
    
var layers = [
    hillshade_layer,
    new TileLayer({
	title: 'Streets',
	type: 'base',
 	source: new OSM(),
	crossOrigin: 'anonymous',
	opacity: 0.7
    }), 
    zoning_layers,
//    new VectorLayer({   source: makeVectorSource(taxlots),  maxResolution: 25, zindex:0 })
    new TileLayer({
 	title: 'Taxlots',
	source: new TileArcGISRest({ url: taxlots    })
    }), 
];

var layercount = layers.length;
for (var i = 0; i < layercount; i++) {
    var layer = layers[i];
    console.log("Layer ", layer.getMinResolution(), layer.getMaxResolution());
}

export { map };
var map = new Map({
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

var layerswitcher = new LayerSwitcher({
    tipLabel: 'Legend' //optional label for button
});
map.addControl(layerswitcher);

var scaleline = new ScaleLine();
scaleline.setUnits("us");
map.addControl(scaleline);

map.addControl(Bookmarks());

/* 
   Toggle the hillshade layer on and off.
*/
function toggleHillshade(evt) {
    var v = !hillshade_layer.getVisible();
    hillshade_layer.setVisible(v);
}
document.getElementById("hillshade_button").addEventListener("click", toggleHillshade);

console.log('body.js loaded');
