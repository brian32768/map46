// body.js xyz

import {Map, View} from "ol";
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer';
import {OSM, TileArcGISRest, ImageArcGISRest, Stamen} from 'ol/source';
import {tile as tileStrategy} from 'ol/loadingstrategy.js';
import XYZ from 'ol/source/XYZ.js';
import {createXYZ} from 'ol/tilegrid.js';
import {ATTRIBUTION} from 'ol/source/OSM.js';

import 'bootstrap/dist/js/bootstrap.js';
import jquery from 'jquery/dist/jquery.min.js';

import Permalink from 'ol-ext/control/Permalink.js';
import Cloud from 'ol-ext/control/Cloud.js';

// wrappers for ol-ext objects
import {Search} from './search.js';
import {CompassRose} from './compassrose.js';

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

// Whitney's Map of Astoria And Environs. https://davidrumsey.georeferencer.com/maps/731856088227/
const whitneys_astoria_url  = "https://maps.georeferencer.com/georeferences/731856088227/2017-02-20T14:25:19.132722Z/map";
const starting_location = {center: [-13775000, 5800000], zoom: 12}; // astoria downtown

// Thompson&West Map Of Benicia, California
//const thompson_benicia_url = "https://maps.georeferencer.com/georeferences/246596689284/2017-02-20T14:25:19.132722Z/map";
//const starting_location    = {center: [-13596000, 4586400], zoom: 15}; // benicia arsenal

let davidrumsey_layer  = new TileLayer({
    source: new XYZ({ url: whitneys_astoria_url + '/{z}/{x}/{y}.png' + '?key=mpLuNUCkgUrSGkCrPyoT',
		      attributions: '<a href="http://davidrumsey.georeferencer.com/">David Rumsey</a>'
		    }),
    opacity: .5,
    permalink: "B",
    zindex: 1
});

const maxres = 100;

var layers = [
    stamen_watercolor_layer,
    osm_streets_layer,
    //astoria_layer,
    davidrumsey_layer,
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
    attributions: [ATTRIBUTION, 'Ziggy Stardust']
});

var pl_ctrl = new Permalink({
    onclick: function(url)
    {
	console.log("Permalink url = ", url);
	document.location = "mailto:?subject=subject&body=" + encodeURIComponent(url); // causes an email app to open with this URL in body.
    },
    urlReplace: false // Default is true; causes the URL to continuously update with the position in latlon and zoom level.
});
map.addControl(pl_ctrl);

function fix_opacity() {
    if (osm_streets_layer.getVisible() || stamen_watercolor_layer.getVisible()) {
	davidrumsey_layer.setOpacity(.5);
    } else {
	davidrumsey_layer.setOpacity(1);
    }

    osm_streets_layer.setOpacity(1);
    stamen_watercolor_layer.setOpacity(1);
    if (stamen_watercolor_layer.getVisible()) {
	osm_streets_layer.setOpacity(.5);
    }
}

var search = new Search();
console.log("search=", search);
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

var mycompass = new CompassRose();
map.addControl(mycompass.mapControl);

// ------------------------------------------------------------------------

// There's an option to set windspeed and direction on this control.
// The ol-ext example control/canvas/map.control.compass.html has
// excellent examples on how to use doc properties.
var cloudControl = new Cloud();
var cloudsVisible = true;
map.addControl(cloudControl);

var cloudbtn = document.getElementById("cloudToggle");
cloudbtn.addEventListener("click", cloudToggle);
function cloudToggle(evt) {
    var v = !cloudsVisible;
    if (v) {
	map.addControl(cloudControl);
    } else {
	map.removeControl(cloudControl);
    }
    cloudsVisible = v;
}


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
