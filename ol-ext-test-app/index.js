import 'bootstrap/dist/css/bootstrap'
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.css'
import './index.css'
//import 'ol-ext/control/GeoBookmark.css'
//import 'ol-ext/control/LayerSwitcher.css'
//import 'ol-ext/control/Permalink.css'

import {Map, View} from 'ol'
import {transform as Transform} from 'ol/proj'
import {Tile as TileLayer, Image as ImageLayer, Vector as VectorLayer} from 'ol/layer'
import {OSM, Stamen, TileArcGISRest, ImageArcGISRest, Vector as VectorSource} from 'ol/source'
import {tile as tileStrategy} from 'ol/loadingstrategy'
import XYZ from 'ol/source/XYZ'
import {createXYZ} from 'ol/tilegrid'
import {Group as LayerGroup} from 'ol/layer'

import {Circle, Fill, Stroke, Style, Text} from 'ol/style'
import Feature from 'ol/Feature'
import {EsriJSON} from 'ol/format'
import GeoJSON from 'ol/format/GeoJSON'
import { getCenter } from 'ol/extent'

import 'bootstrap/dist/js/bootstrap'
import jquery from 'jquery/dist/jquery'

import {defaults as defaultControls, ScaleLine} from 'ol/control'

// ol-ext stuff
import LayerSwitcher from 'ol-ext/control/LayerSwitcher'
import Permalink from 'ol-ext/control/PermaLink'
import SearchNominatim from 'ol-ext/control/SearchNominatim'
import { OverviewMap as Overview } from 'ol/control' // Openlayers control; there's an ol-ext one too
import { Bookmarks } from './bookmarks'

var esrijsonFormat = new EsriJSON();

// ========================================================================

const oid_name = 'OBJECTID';
var selection = {}; // list of selected features

var taxlots         = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Taxlots/FeatureServer/';
var taxlotsLabels   = taxlots + '0';
var taxlotsFeatures = taxlots + '1';
//var taxlotsMapServer = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/web_mercator/CC_Taxlots/MapServer';

var zoning           = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Zoning/FeatureServer/';
var zoningLabels     = zoning + '0';
var zoningBoundaries = zoning + '1';
var zoningTiles      = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Zoning/MapServer"

var worldImagery = "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer"
var hillshade     = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/BareEarthHS/ImageServer";

// ========================================================================

function makeVectorSource(my_url) {

    var source = new VectorSource({
	loader: function(extent, resolution, projection) {
	    const url = my_url + '/' + '/query/?f=json&' +
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

const zoningLayers = new LayerGroup({
    'title': 'Zoning',
    layers: [
        new VectorLayer({
            title: 'Labels',
            source: makeVectorSource(zoningLabels)
        }),
    	new VectorLayer({
    	    title: 'Boundaries',
    	    source: makeVectorSource(zoningBoundaries)
    	}),
    ],
    visible: true,
    opacity: 0.5,
    maxResolution: 100,
    zindex: 1
});

const zoningTileLayer = new TileLayer({
    title: 'Clatsop County Zoning',
    type: 'base',
    source: new TileArcGISRest({
        url: zoningTiles,
        attributions: "Clatsop County GIS, Oregon",
	}),
    visible: true
});

const hillshadeLayer = new ImageLayer({
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

const imageryLayer = new ImageLayer({
    title: 'World Imagery',
    type: 'base',
    source: new ImageArcGISRest({ url: worldImagery,
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
const watercolorLayer = new TileLayer({
	title: 'Watercolor',
	type: 'base',
 	source: new Stamen({
        layer: 'watercolor',
    }),
	crossOrigin: 'anonymous',
    opacity: .2,
	visible: true
});
const tonerLayer = new TileLayer({
	title: 'Toner',
	type: 'base',
 	source: new Stamen({
        layer: 'toner',
    }),
	crossOrigin: 'anonymous',
    opacity: 1,
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
const taxlots_mapserver_layer = new TileLayer({
 	title: 'Taxlots',
	source: new TileArcGISRest({ url: taxlots    })
});
*/

// Current selection
const selectLayer = new VectorLayer({
    source: new VectorSource(),
    style: new Style({
	image: new Circle({
	    radius: 5,
	    stroke: new Stroke ({
		color: 'rgb(255,165,0)',
		width: 3
	    }),
	    fill: new Fill({
		color: 'rgba(255,165,0,.3)'
	    })
	}),
	stroke: new Stroke ({
	    color: 'rgb(255,165,0)',
	    width: 3
	}),
	fill: new Fill({
	    color: 'rgba(255,165,0,.3)'
	})
    })
});

const layers = [
//    hillshadeLayer,
    imageryLayer,
    streetsLayer,
//    zoningLayers,
    zoningTileLayer,
//    taxlotsFeatureLayer,
//    taxlotsLabelLayer, This throws an error
    selectLayer
];
const overviewLayers = [
    tonerLayer,
    watercolorLayer,
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
        imageryLayer.setVisible(true);
        //hillshadeLayer.setVisible(false);
        imgbtn.innerText = "streets";
    } else {
        streetsLayer.setVisible(true);
	    imageryLayer.setVisible(false);
	    imgbtn.innerText = "aerial";
    }
}

const search = new SearchNominatim({
	position: true
    });
map.addControl(search);

// Select feature when click on the reference index
search.on('select', function(e) {
    console.log(e);
    selectLayer.getSource().clear();
    // Check if we get a geojson to describe the search
    if (e.search.geojson) {
	var format = new GeoJSON();
	var f = format.readFeature(e.search.geojson, { dataProjection: "EPSG:4326", featureProjection: map.getView().getProjection() });
	selectLayer.getSource().addFeature(f);
	var view = map.getView();
	var resolution = view.getResolutionForExtent(f.getGeometry().getExtent(), map.getSize());
	var zoom = view.getZoomForResolution(resolution);
	var center = getCenter(f.getGeometry().getExtent());
	// redraw before zoom
	setTimeout(function(){
	    view.animate({
		center: center,
		zoom: Math.min (zoom, 16)
	    });
	}, 100);
    } else {
	map.getView().animate({
	    center:e.coordinate,
	    zoom: Math.max (map.getView().getZoom(),16)
	});
    }
});

map.on('click', function(event) {
    const features = map.getFeaturesAtPixel(event.pixel);
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

    const feature = features[0];
    const properties = feature.getProperties();

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
