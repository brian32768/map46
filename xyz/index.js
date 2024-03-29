import {Map, View} from "ol"
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer'
import {OSM, TileArcGISRest, ImageArcGISRest} from 'ol/source'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import XYZ from 'ol/source/XYZ'
import {createXYZ} from 'ol/tilegrid'
import {ATTRIBUTION} from 'ol/source/OSM'
import {transform as Transform} from 'ol/proj'

import 'ol/ol.css'
import './index.css'

const naip2011Url = "http://imagery.oregonexplorer.info/arcgis/rest/services/NAIP_2011/NAIP_2011_WM/ImageServer"; // 1 meter
const naip2009Url = "http://imagery.oregonexplorer.info/arcgis/rest/services/NAIP_2009/NAIP_2009_WM/ImageServer"; // 1/2 meter
const hhhsUrl   = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/HighestHitHS/ImageServer";

const naip2011Layer = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: naip2011Url }) });
const naip2009Layer = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: naip2009Url }) });
const hhhsLayer   = new ImageLayer({ source: new ImageArcGISRest({ ratio: 1, params: {}, url: hhhsUrl}), opacity:0.5  });

const zoningUrl = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Zoning/MapServer";
const zoningSource = new TileArcGISRest({
    url: zoningUrl,
    crossOrigin: 'anonymous',
});
const zoningTileLayer = new TileLayer({
    title: 'Clatsop County Zoning',
    source: zoningSource,
    opacity: 0.9,
    permalink: 'Streets',
    visible: true,
    zindex: 3,
    params: {
        FORMAT: "PNG32"
    }
});
console.log('zoning', zoningUrl, zoningSource, zoningTileLayer);
const streetsLayer  = new TileLayer({
    title: 'Streets',
    type: 'base',
    source: new OSM(),
    crossOrigin: 'anonymous',
    opacity: 0.5,
    permalink: 'Streets',
    visible: true,
    zindex: 3
});

// 1. Find a nice old map in the Rumsey collection.
// 2. Click on "This Map"
// 3. Copy the XYZ link from "Use in GIS Apps -> Get Links"

// Whitney's Map of Astoria And Environs. https://davidrumsey.georeferencer.com/maps/731856088227/
//const zoom = 13;
//const whitneys_astoria_url  = "https://maps.georeferencer.com/georeferences/731856088227/2017-02-20T14:25:19.132722Z/map";
const starting_location = {center: Transform([-123.825, 46.181], 'EPSG:4326', 'EPSG:3857'), zoom: zoom}; // astoria downtown

// "3-10" Aerial 1938 Berkeley showing Key System.
const sunderlandAerialUrl="https://maps.georeferencer.com/georeferences/920948447332/2017-02-20T14:25:19.132722Z/map"

// Patterson, Smith 1910 map of Berkeley
const zoom=10;
const pattersonSmithUrl = "https://maps.georeferencer.com/georeferences/268519810791/2017-02-20T14:25:19.132722Z/map";
//const starting_location = {center: Transform([-123.25, 37.87], 'EPSG:4326', 'EPSG:3857'), zoom: zoom}; // berkeley

// Thompson&West Map Of Benicia, California
//const zoom=15;
//const thompson_benicia_url = "https://maps.georeferencer.com/georeferences/246596689284/2017-02-20T14:25:19.132722Z/map";
//const starting_location    = {center: [-13596000, 4586400], zoom: zoom}; // benicia arsenal

const davidrumseyLayer  = new TileLayer({
    source: new XYZ({ url: sunderlandAerialUrl + '/{z}/{x}/{y}.png' + '?key=mpLuNUCkgUrSGkCrPyoT',
		      attributions: '<a href="http://davidrumsey.georeferencer.com/">David Rumsey</a>'
		    }),
    opacity: .5,
    permalink: "B",
    zindex: 1
});

const maxres = 100;

const layers = [
//    naip2009Layer,
//    naip2011Layer,
//    hhhsLayer,
    streetsLayer,
    //davidrumseyLayer,
    zoningTileLayer,
];

const map = new Map({
    target: 'map',
    layers: layers,
    view: new View(starting_location),
});

// ------------------------------------------------------------------------

const zoningbtn = document.getElementById("zoningToggle");
zoningbtn.addEventListener("click", (evt) => {
    const v = !zoningTileLayer.getVisible();
    zoningTileLayer.setVisible(v);
    console.log('zoning',v);
})

const streetsbtn = document.getElementById("streetsToggle");
streetsbtn.addEventListener("click", (evt) => {
    const v = !streetsLayer.getVisible();
    streetsLayer.setVisible(v);
    console.log('streets',v);
})

const naip2011btn = document.getElementById("naip2011Toggle");
naip2011btn.addEventListener("click", (evt) => {
    const v = !naip2011Layer.getVisible();
    naip2011Layer.setVisible(v);
    console.log('naip2011',v);
})

const naip2009btn = document.getElementById("naip2009Toggle");
naip2009btn.addEventListener("click", (evt) => {
    const v = !naip2009Layer.getVisible();
    naip2009Layer.setVisible(v);
    console.log('naip2009',v);
})

const hhhsbtn = document.getElementById("highesthitToggle");
hhhsbtn.addEventListener("click", (evt) => {
    const v = !hhhsLayer.getVisible();
    hhhsLayer.setVisible(v);
    console.log('hhhs',v);
})
