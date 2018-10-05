// body.js

import { Map, View } from "ol";
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

var taxlots       = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/FeatureServer/0';

var commercial    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Commercial/MapServer";
var noncommercial = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Noncommercial/MapServer";
var boundaries    = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Boundaries/MapServer";
var residential   = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/zoning_Residential/MapServer";

var bareearth     = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/BareEarthHS/ImageServer";

var zoning_layers = new LayerGroup({
    layers: [
	new TileLayer({ 	source: new TileArcGISRest({ url: commercial    }) }), 
	new TileLayer({ 	source: new TileArcGISRest({ url: noncommercial }) }), 
	new TileLayer({ 	source: new TileArcGISRest({ url: boundaries    }) }), 
	new TileLayer({ 	source: new TileArcGISRest({ url: residential   }) })
    ],
    visible: true,
    opacity: 0.5,
    maxResolution: 100,
    zindex: 1
});

var hillshade_layer = new ImageLayer({    source: new ImageArcGISRest({ url: bareearth,
									params: {},
									ratio: 1
								      }),
					  maxResolution: 200,
					  opacity: 0.7,
					  visible: true
				     });
    
var layers = [
    new TileLayer({ 	source: new OSM() }), 
    hillshade_layer,
    zoning_layers,
    new VectorLayer({   source: makeVectorSource(taxlots),  maxResolution: 25, zindex:0 })
];

var layercount = layers.length;
for (var i = 0; i < layercount; i++) {
    var layer = layers[i];
    console.log("Layer ", layer.getMinResolution(), layer.getMaxResolution());
}

var map = new Map({
    target: 'map',
    layers: layers,
    view: new View({
        center: [-13775000, 5800000],
        zoom: 12
    })
});

/* 
   Toggle the hillshade layer on and off.
*/
function toggleHillshade(evt) {
    var v = !hillshade_layer.getVisible();
    hillshade_layer.setVisible(v);
    //console.log("toggleHillshade(", evt, ")");
}
document.getElementById("hillshade_button").addEventListener("click", toggleHillshade);

console.log('body.js loaded');
