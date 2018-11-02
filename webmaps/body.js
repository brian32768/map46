// body.js ole-test

import $ from 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.js';

import {Map, View} from "ol";
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer';
import {OSM, TileArcGISRest, ImageArcGISRest, Stamen} from 'ol/source';
import {tile as tileStrategy} from 'ol/loadingstrategy.js';
import XYZ from 'ol/source/XYZ.js';
import {ATTRIBUTION} from 'ol/source/OSM.js';

import Permalink from 'ol-ext/control/Permalink.js';

import {EsriJSON} from "ol/format";
import {Vector as VectorSource} from "ol/source";
import {Vector as VectorLayer} from "ol/layer";
import {tile as TileLoader} from 'ol/loadingstrategy';
import {createXYZ as tileCreateXYZ} from 'ol/tilegrid';

import {VectorLayerModifier} from 'ole-brian32768';

// wrappers for ol-ext objects
import {Search} from '/src/search.js';
//import {CompassRose} from './compassrose.js';

var stamen_watercolor_layer = new TileLayer({
    title: "Watercolor",
    type: 'base',
    source: new Stamen({ layer:"watercolor" }),
    crossOrigin: 'anonymous',
    opacity: 0.5,
    permalink: "WC",
    visible: true,
    zindex: 2
});

var osm_streets_layer  = new TileLayer({
    title: 'Streets',
    type: 'base',
    source: new OSM(),
    crossOrigin: 'anonymous',
    opacity: 0.5,
    permalink: 'Streets',
    visible: true,
    zindex: 3
});

const starting_location = {center: [-13785000, 5807600], zoom: 14}; // astoria downtown

function addArcGISLayer(serviceUrl, map_srs, opacity) {
    // Create and return an ArcGIS FeatureServer layer.
    let esrijsonFormat = new EsriJSON();
    let vectorSource = new VectorSource({
	loader: function(extent, resolution, projection) {
            var url = serviceUrl + '/query/?f=json&' +
		'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
		encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' +
				   extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] +
				   ',"spatialReference":{"wkid":102100}}') +
		'&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
		'&outSR=102100';

            $.ajax({url: url, dataType: 'jsonp', success: function(response) {
		if (response.error) {
		    alert("Error: " + response.error.message + '\n' +
			     response.error.details.join('\n'));
		} else {
		    // dataProjection will be read from document
		    var features = esrijsonFormat.readFeatures(response, {
			featureProjection: projection
		    });
		    if (features.length > 0) {
			vectorSource.addFeatures(features);
		    }
		}
            }});
	},
	strategy: TileLoader(tileCreateXYZ({
            tileSize: 512
	}))
    });

    let vectorlayer = new VectorLayer({
	source: vectorSource,
	opacity: opacity
    });

    var styleUrl = serviceUrl + '?f=json';

    $.ajax({url: styleUrl, dataType: 'jsonp', success: function(response) {
	if (response.error) {
      alert("Could not load \"" + styleUrl + "\" Error:" + response.error.message + '\n' +
		    response.error.details.join('\n'));
	} else {
      //VectorLayerModifier.modifyLayer(response, vectorlayer, map_srs);
	    // I'd like to add or remove attributions here but so far don't know how to do that.
	    //map.addLayer(vectorlayer);
	}
    }});
}

const maxres = 100;

var layers = [
    stamen_watercolor_layer,
    osm_streets_layer
];

var layercount = layers.length;
for (var i = 0; i < layercount; i++) {
    var layer = layers[i];
    console.log("Layer ", layer.getMinResolution(), layer.getMaxResolution());
}

var map = new Map({
    target: 'map',
    layers: layers,
    view: new View(starting_location),
    attributionOptions: {
	collapsible: false
    },
    attributions: [ATTRIBUTION]
});

const map_srs = map.getView().getProjection();

const ccgis = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/';
const zoning_fs = 'Zoning_3857/FeatureServer/';

addArcGISLayer(ccgis + zoning_fs + '0', map_srs, 0.5); // ASTORIA
addArcGISLayer(ccgis + zoning_fs + '1', map_srs, 0.5); // CANNON BEACH
addArcGISLayer(ccgis + zoning_fs + '2', map_srs, 0.5); // Warrenton
addArcGISLayer(ccgis + zoning_fs + '3', map_srs, 0.5); // Boundaries    theres a style problem here
addArcGISLayer(ccgis + zoning_fs + '4', map_srs, 0.5); // Commercial
addArcGISLayer(ccgis + zoning_fs + '5', map_srs, 0.5); // Non-commercial
addArcGISLayer(ccgis + zoning_fs + '6', map_srs, 0.5); // Residential

const taxlots_fs = 'Assessment_and_Taxation/Taxlots_3857/FeatureServer/';
addArcGISLayer(ccgis + taxlots_fs + '0', map_srs, 1.0);

var pl_ctrl = new Permalink({
    onclick: function(url) {
	console.log("Permalink url = ", url);
	document.location = "mailto:?subject=subject&body=" + encodeURIComponent(url); // causes an email app to open with this URL in body.
    },
    urlReplace: false // Default is true; causes the URL to continuously update with the position in latlon and zoom level.
});
map.addControl(pl_ctrl);

function fix_opacity() {
    osm_streets_layer.setOpacity(1);
    stamen_watercolor_layer.setOpacity(1);
    if (stamen_watercolor_layer.getVisible()) {
	osm_streets_layer.setOpacity(.5);
    }
}


let search = new Search();
map.addControl(search.mapControl);
map.addLayer(search.selectionlayer);

// Select feature when click on the reference index
search.mapControl.on('select', function(e) {
    // console.log(e);
    search.selectionlayer.getSource().clear();
    // Check if we get a geojson to describe the search
    if (e.search.geojson) {
	var format = new ol.format.GeoJSON();
	var f = format.readFeature(e.search.geojson, { dataProjection: "EPSG:4326", featureProjection: map.getView().getProjection() });
	search.selectionlayer.getSource().addFeature(f);
	var view = map.getView();
	var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize());
	var zoom = view.getZoomForResolution(resolution);
	var center = ol.extent.getCenter(f.getGeometry().getExtent());
	// redraw before zoom
	setTimeout(function(){
	    view.animate({
		center: center,
		zoom: Math.min(zoom, 16)
	    });
	}, 100);
    }
    else {
	map.getView().animate({
	    center: e.coordinate,
	    zoom: Math.max(map.getView().getZoom(),16)
	});
    }
});


//var mycompass = new CompassRose();
//map.addControl(mycompass.mapControl);

// ------------------------------------------------------------------------

var streetsbtn = document.getElementById("streetsToggle");
streetsbtn.addEventListener("click", streetsToggle);
function streetsToggle(evt) {
    var v = !osm_streets_layer.getVisible();
    osm_streets_layer.setVisible(v);
    console.log('streets',v);
    fix_opacity();
}

var wcbtn = document.getElementById("watercolorToggle");
wcbtn.addEventListener("click", watercolorToggle);
function watercolorToggle(evt) {
    var v = !stamen_watercolor_layer.getVisible();
    stamen_watercolor_layer.setVisible(v);
    console.log('watercolor',v);
    fix_opacity();
}

console.log('body.js loaded');
