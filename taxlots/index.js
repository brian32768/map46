import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls, OverviewMap } from 'ol/control'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { defaults as defaultInteractions } from 'ol/interaction'
import { EsriJSON, GeoJSON } from 'ol/format'
import OSM from 'ol/source/OSM'
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import { Select } from 'ol/interaction'
import Feature from 'ol/Feature'
import { tile as tileStrategy, bbox as bboxStrategy} from 'ol/loadingstrategy'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { createXYZ } from 'ol/tilegrid'
// jsonp avoids CORS problems
import jsonp from 'jsonp'
// Used to show position on status bar
import { toStringHDMS } from 'ol/coordinate'
import { toLonLat } from 'ol/proj'
import { Popup } from './popup'
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap'
import 'ol/ol.css'
import './webmaps.css'

var esri    = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';

//const taxlots_mapserver       = 'https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Assessment_and_Taxation/Taxlots_3857/MapServer/1';
//const esrijsonFormat = new EsriJSON();
const geoserver = "http://maps.wildsong.biz/geoserver/clatsop-wfs/"
const taxlotsWFS = geoserver + "ows?service=WFS&version=2.0.0&request=GetFeature&typeName=clatsop-wfs%3Ataxlots"
const geojsonFormat  = new GeoJSON();
const taxlotField = 'taxlot';

function makeVectorSource(url) {
    /* I assume that all the data is projected into Web Mercator here. */

    const source = new VectorSource({
    	loader: (extent, resolution, projection) => {
// This is what a well-formed query from QGIS looks like
//"GET /geoserver/wfs?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&
//TYPENAMES=clatsop-wfs:taxlots
//&STARTINDEX=0&COUNT=1000
//&SRSNAME=urn:ogc:def:crs:EPSG::3857
//&BBOX=-13799781.77290469780564308,5763634.00552924070507288,-13799148.80835255607962608,5763990.56951477471739054,
//urn:ogc:def:crs:EPSG::3857 HTTP/1.1"
// 301 169 "-"
//"Mozilla/5.0 QGIS/3.6.0-Noosa
            let bb = "&BBOX=" + extent.join(',').toString() // + ,'EPSG:3857'
            let fsurl = url + "&outputFormat=text/javascript" +
                "&count=1000" + bb //+ '&SRSNAME=EPSG:3857'
            jsonp(fsurl,
                { name:"parseResponse", timeout:60000 },
                (err, data) => {
                    if (err) {
                        console.log("DataLoader(", url, " ):", err);
                    } else {
                        console.log("DataLoader():", data)
                        let features = geojsonFormat.readFeatures(data, {
                            featureProjection: projection
                        });
                        if (features.length > 0) {
                            console.log("DataLoader() Adding ", features.length);
                            /*features.forEach( (f) => {
                                f.setStyle(style);
                            })*/
                            source.addFeatures(features);
                        }
                }
            });
        },
        strategy:  bboxStrategy, // tileStrategy(createXYZ({ tileSize: 512 }))
    });
    return source;
}

var openSansAdded = false;

var myDom = {
    polygons: {
        text: 'normal',
        align: 'center',
        baseline: 'middle',
        rotation: 0,
        font: 'arial',
        weight: 'normal',
        placement: 'point',
        maxangle: '0',
        overflow: '',
        size: '12px',
        offsetX: '0',
        offsetY: '0',
        color: '#000',
        outline: '#fff',
        outlineWidth: '2',
        maxreso: 3,
    }
};

var getText = function(feature, resolution, dom) {
    var type = dom.text;
    var maxResolution = dom.maxreso;
    var text = feature.get('OBJECTID');

//    if (resolution > maxResolution) {
//	console.log(resolution, maxResolution);
//        text = '';
//    }
//    } else if (type == 'hide') {
//        text = '';
//    } else if (type == 'shorten') {
//        text = text.trunc(12);
//    } else if (type == 'wrap' && (!dom.placement || dom.placement.value != 'line')) {
//        text = stringDivider(text, 16, '\n');
//    }

    return text;
};

var createTextStyle = function(feature, resolution, dom) {
    var align     = dom.align;
    var baseline  = dom.baseline;
    var size      = dom.size;
    var offsetX   = parseInt(dom.offsetX, 10);
    var offsetY   = parseInt(dom.offsetY, 10);
    var weight    = dom.weight;
    var placement = dom.placement ? dom.placement : undefined;
    var maxAngle  = dom.maxangle ? parseFloat(dom.maxangle) : undefined;
    var overflow  = dom.overflow ? (dom.overflow == 'true') : undefined;
    var rotation  = parseFloat(dom.rotation);

    if (dom.font == '\'Open Sans\'' && !openSansAdded) {
        var openSans = document.createElement('link');
        openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
        openSans.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(openSans);
        openSansAdded = true;
    }
    var font = weight + ' ' + size + ' ' + dom.font;
    var fillColor = dom.color;
    var outlineColor = dom.outline;
    var outlineWidth = parseInt(dom.outlineWidth, 10);
    return new Text({
        textAlign: align == '' ? undefined : align,
        textBaseline: baseline,
        font: font,
        text: getText(feature, resolution, dom),
        fill: new Fill({color: fillColor}),
        stroke: new Stroke({color: outlineColor, width: outlineWidth}),
        offsetX: offsetX,
        offsetY: offsetY,
        placement: placement,
        maxAngle: maxAngle,
        overflow: overflow,
        rotation: rotation
    });
};

function taxlotStyle(feature, resolution) {
    // see https://gis.stackexchange.com/questions/132607/how-to-change-color-of-a-layer-in-openlayers#132608
    return new Style({
    	// If there is no fill defined then clicks won't get caught in our polygons.
    	fill: new Fill({
    	    color: 'rgba(200,200,200,0.10)'
    	}),
    	stroke: new Stroke({
    	    color: "#ff0000",
    	    width: 1
    	}),
        text: createTextStyle(feature, resolution, myDom.polygons)
    });
}

const taxlots_layer = new VectorLayer({
    source: makeVectorSource(taxlotsWFS),
    style:  taxlotStyle
});

const view = new View({
    center: [-13799309, 5765712],
    zoom: 14,
    minZoom: 10,
    maxZoom: 19
//    center: [0,0], zoom: 2
});

const popup = new Popup();

const layers = [
    	new TileLayer({ source: new OSM() }),
    	taxlots_layer,
    ];

const map = new Map({
    controls: defaultControls().extend([
        new OverviewMap()
    ]),
    layers: layers,
    overlays: [popup.overlay],
    target: 'map',
    view: view
});


// Look up info and format it for display in a popup.
var featureInfo = function(pixel) {
    let info = [];
    let features = [];

    map.forEachFeatureAtPixel(pixel, function(feature) {
    	features.push(feature);
    	console.log("found " + feature);
    });

    if (features.length > 0) {
    	// Show one or many features
    	let i, ii;
        info.push(taxlotField);
    	for (i = 0, ii = features.length; i < ii; ++i) {
    	    let attribute_names = Object.keys(features[i].values_);
    	    let f = features[i].get(taxlotField);
    	    if (f) {
    		    info.push(' ' + f);
    	    } else {
    		    console.log('key ', taxlotField, ' not found', attribute_names);
    	    }
    	}
        info.join('<br />') || '';
    } else {
        console.log('You did not click any feature.');
        info = '';
    }
    return info;
}

/*
The reason this is turned off is that when you click a dot near the top of the map,
it cause a scroll which then immediately fires this event. Fix somehow?? A counter??
map.on('movestart', function(evt) {
if the popup is open, increment counter
if counter is > 1 then
    popup.close();
});
*/

map.on('pointermove', function(evt) {
    // Handler for the map cursor
    if (evt.dragging) {	return; }

    var coordinate = evt.coordinate;
    var latlon = toStringHDMS(toLonLat(coordinate));
    document.getElementById('cursor_position').innerHTML = latlon;
});

/*
map.on('click', function(evt) {
    // Handler for click events on map.

//  var pixel = map.getEventPixel(evt.originalEvent);
    var pixel = evt.pixel;

    var mycontent = featureInfo(pixel);
    if (!mycontent) { return; } // nothing to see here

    // Set up where the popup will pop up.
    var coordinate = evt.coordinate;
    popup.overlay.setPosition(coordinate);
    popup.container.innerHTML = mycontent;
    //console.log('click ' + evt.coordinate);
});
*/

map.on('moveend', function(evt) {
    var z = view.getZoom();
    var r = view.getResolution();
    //console.log('moveend zoom ' + z + ' res ' + r);
});

const select = new Select()
map.addInteraction(select)
select.on('select', function(e) {
            document.getElementById('selectstatus').innerHTML = '&nbsp;' +
                e.target.getFeatures().getLength() +
                ' selected features (last operation selected ' + e.selected.length +
                ' and deselected ' + e.deselected.length + ' features)';
          });
