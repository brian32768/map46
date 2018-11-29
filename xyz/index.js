// index.js xyz

import {Map, View} from "ol";
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer';
import {OSM, TileArcGISRest, ImageArcGISRest} from 'ol/source';
import {tile as tileStrategy} from 'ol/loadingstrategy.js';
import XYZ from 'ol/source/XYZ.js';
import {createXYZ} from 'ol/tilegrid.js';
import {ATTRIBUTION} from 'ol/source/OSM.js';
import {transform as Transform} from 'ol/proj';

import 'bootstrap/dist/js/bootstrap.js';
import jquery from 'jquery/dist/jquery.min.js';

import Permalink from 'ol-ext/control/Permalink.js';
import Cloud from 'ol-ext/control/Cloud.js';

// wrappers for ol-ext objects
import {Search} from './search.js';
import {CompassRose} from './compassrose.js';

let naip2011Url = "http://imagery.oregonexplorer.info/arcgis/rest/services/NAIP_2011/NAIP_2011_WM/ImageServer"; // 1 meter
let naip2009Url = "http://imagery.oregonexplorer.info/arcgis/rest/services/NAIP_2009/NAIP_2009_WM/ImageServer"; // 1/2 meter
let hhhsUrl   = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/HighestHitHS/ImageServer";

let naip2011_layer = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: naip2011Url }) });
let naip2009_layer = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: naip2009Url }) });
let hhhs_layer   = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: hhhsUrl}), opacity:0.5  });

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
const starting_location = {center: Transform([-123.825, 46.181], 'EPSG:4326', 'EPSG:3857')}; // astoria downtown

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
    naip2009_layer,
    naip2011_layer,
    hhhs_layer,
    osm_streets_layer
    //astoria_layer,
    //davidrumsey_layer,
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
    attributions: [ATTRIBUTION, 'Ziggy played guitar']
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

var naip2011btn = document.getElementById("naip2011Toggle");
naip2011btn.addEventListener("click", naip2011Toggle);
function naip2011Toggle(evt) {
    var v = !naip2011_layer.getVisible();
    naip2011_layer.setVisible(v);
    console.log('naip2011',v);
    fix_opacity();
}

var naip2009btn = document.getElementById("naip2009Toggle");
naip2009btn.addEventListener("click", naip2009Toggle);
function naip2009Toggle(evt) {
    var v = !naip2009_layer.getVisible();
    naip2009_layer.setVisible(v);
    console.log('naip2009',v);
    fix_opacity();
}

var hhhsbtn = document.getElementById("highesthitToggle");
hhhsbtn.addEventListener("click", hhhsToggle);
function hhhsToggle(evt) {
    var v = !hhhs_layer.getVisible();
    hhhs_layer.setVisible(v);
    console.log('hhhs',v);
    fix_opacity();
}

console.log('index.js loaded');
