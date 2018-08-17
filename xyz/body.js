// body.js

import 'ol/ol.css';
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
//import OSM from "ol/source/OSM";
import "bootstrap/dist/js/bootstrap.js";

var esri = "https://services.arcgisonline.com/ArcGIS/rest/services/";
var service = 'World_Street_Map';
var map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new XYZ({
                attributions: 'Tiles © <a href="' + esri + service + '/MapServer">ArcGIS</a>',
                url: esri + service + '/MapServer/tile/{z}/{y}/{x}'
            })
        })
    ],
    view: new View({
        center: [-13775000, 5768000],
        zoom: 11
    })
});

console.log('xyz.js loaded');

