import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

import {mapbox_key} from "./keys.js";

var taxlots = "https://tiles.arcgis.com/tiles/l89P2qlKPxgrFDLw/arcgis/rest/services/Taxlots_wm/VectorTileServer/tile/{z}/{y}/{x}.pbf";
var taxlot_layer = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: taxlots
    })
});

var mapbox_basemap = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
	attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
	format: new MVT(),
	url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' +
            '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
    }),
    style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
});

var esri_basemap = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    })
});

var maptiler_basemap = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: "https://maps.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5"
    })
});



var map = new Map({
    layers: [
//	maptiler_basemap,
//	esri_basemap,
	mapbox_basemap,
	taxlot_layer
    ],
    target: 'map',
    view: new View({
	center: [-13784553, 5802546],
	zoom: 11, minZoom: 10, maxZoom: 19
    })
});
