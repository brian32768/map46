import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';
import {Fill, Icon, Stroke, Style, Text} from 'ol/style.js';

// Copied from ArcGIS.com
const taxlots_url = "https://tiles.arcgis.com/tiles/l89P2qlKPxgrFDLw/arcgis/rest/services/Clatsop_DBO_taxlots_wm/VectorTileServer";

var selection = {};

var id_property = '';
var taxlots = taxlots_url + "/tile/{z}/{y}/{x}.pbf";
var taxlot_layer = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: taxlots
    }),
    style: function(feature) {
	var selected = 1 ; // !!selection[feature.get(id_property)];
	return new Style({
	    stroke: new Stroke({
		color: selected? 'rgba(200,20,20,0.8)' : 'gray',
		width: selected? 2 : 1
	    }),
	    fill: new Fill({
		color: selected? 'rgba(200,20,20,0.1)' : 'rgba(20,20,20,0.9)'
	    })
	});
    }
});

/*
import {mapbox_key} from "./keys.js";
var mapbox_basemap = new VectorTileLayer({
    declutter: true,
    source: new VectorTileSource({
	attributions: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> ' +
            '© <a href="https://www.openstreetmap.org/copyright">' +
            'OpenStreetMap contributors</a>',
	format: new MVT(),
	url: 'https://{a-d}.tiles.mapbox.com/v4/mapbox.mapbox-streets-v6/' + '{z}/{x}/{y}.vector.pbf?access_token=' + mapbox_key
    }),
    style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
});
*/

// Does not work due to CORS erroer, need "Access-Control-Allow-Origin" added to header.
var esri_basemap = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    }),
    style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
});

var maptiler_contour_layer = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: "https://maps.tilehosting.com/data/contours/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5"
    }),
    style: function(feature) {
	return new Style({
	    stroke: new Stroke({
		color: 'rgba(194,144,27,50)',
		width: 1
	    })
	});
    }
});

var maptiler_basemap = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: "https://maps.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5"
    }),
    style: createMapboxStreetsV6Style(Style, Fill, Stroke, Icon, Text)
});

var map = new Map({
    layers: [
//	maptiler_basemap,
	esri_basemap,
//	mapbox_basemap,
	maptiler_contour_layer,
	taxlot_layer
    ],
    target: 'map',
    view: new View({
	center: [-13784553, 5802546],
	zoom: 11, minZoom: 10, maxZoom: 19
    })
});

//var selectElement = document.getElementById('type');

map.on('click', function(event) {
    var features = map.getFeaturesAtPixel(event.pixel);
    if (!features) {
        selection = {}; // clear selection
        // force redraw of layer style
        taxlot_layer.setStyle(taxlot_layer.getStyle());
        return;
    }
    var i = 0;
    for (let f of features) {
	console.log("feature " + i + ":" + f.getGeometry())
	i++;
    }
    var feature = features[0];
    var keys = Object.keys(feature);
    console.log('keys = ' + keys); // show property names
    var fid = feature.get(id_property);

    selection = {}; // clear any existing selection
/*
    if (selectElement.value === 'singleselect') {
        selection = {};
    }
*/
    // add selected feature to lookup
    selection[fid] = feature;

    // force redraw of layer style
    taxlot_layer.setStyle(taxlot_layer.getStyle());
});
