// body.js
//
// The code for my very first ArcGIS API for Javascript demo.

/* Using parcel-bundler instead of Dojo
import Map from "esri/Map";
import MapView from "esri/views/MapView";
import FeatureLayer from "esri/layers/FeatureLayer";
import WebTileLayer from "esri/layers/WebTileLayer";
*/

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/layers/WebTileLayer",
    "dojo/domReady!"
], function(Map, MapView, FeatureLayer, WebTileLayer){
    var map = new Map({
	//      basemap: "streets", // You can load ESRI basemaps using just a keyword.
    });
    var view = new MapView({
	container: "viewDiv",  // Reference to the scene div created in step 5
	map: map,  // Reference to the map object created before the scene
	zoom: 14,  // Sets zoom level based on level of detail (LOD)
	center: [-123.85, 46.18]  // Sets center point of view using longitude,latitude
    });

    // Suggestions for many other OSM servers can be found here
    // https://wiki.openstreetmap.org/wiki/Tile_servers

    // This is how to load a service layer as a basemap without going through ESRI.
    // Docs are at https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-WebTileLayer.html
    var osm_basemap = new WebTileLayer({
	// generic OpenStreetMap
	urlTemplate: "https://{subDomain}.tile.openstreetmap.org/${level}/${col}/${row}.png", // z=level y=col x=row
	subDomains: ['a', 'b', 'c']
	/*
	urlTemplate: 'https://stamen-tiles-{subDomain}.a.ssl.fastly.net/terrain/{level}/{col}/{row}.png',
	subDomains: ['a', 'b', 'c', 'd']
	*/
    });
    map.add(osm_basemap);
    
    var layer = new FeatureLayer({
	url: 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/Taxlots_3857/MapServer//0'
    });
    map.add(layer);
});

// That's all!

