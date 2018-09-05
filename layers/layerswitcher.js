// layers layerswitcher.js
//

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Group from "ol/layer/Group.js";
import {defaults as defaultControls, OverviewMap} from 'ol/control.js';
import {Tile as TileLayer} from 'ol/layer.js';
import {Image as ImageLayer} from "ol/layer.js";
import {OSM, Stamen, ImageArcGISRest} from "ol/source";
import LayerSwitcher from "ol-layerswitcher/dist/ol-layerswitcher.js";
import {transform as Transform} from "ol/proj";

var watercolor_w_labels = new Group({
    title: 'Water color with labels',
    type: 'base',
    combine: true,
    visible: false,
    layers: [
        new TileLayer({
            source: new Stamen({
                layer: 'watercolor'
            })
        }),
        new TileLayer({
            source: new Stamen({
                layer: 'terrain-labels'
            })
        })
    ]
});

var watercolor = new TileLayer({
    title: 'Water color',
    type: 'base',
    visible: false,
    source: new Stamen({
        layer: 'watercolor'
    })
});

var osm = new TileLayer({
    title: 'OSM',
    type: 'base',
    visible: true,
    source: new OSM()
});

var map = new Map({
    target: 'map',
    view: new View({
        center: Transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    }),
    layers: [
        new Group({
            'title': 'Base maps',
            layers: [
		watercolor_w_labels,
		watercolor,
		osm
            ]
        }),
        new Group({
            title: 'Overlays',
            layers: [
		new ImageLayer({
                    title: 'Countries',
                    source: new ImageArcGISRest({
                        ratio: 1,
                        params: {'LAYERS': 'show:0'},
                        url: "https://ons-inspire.esriuk.com/arcgis/rest/services/Administrative_Boundaries/Countries_December_2016_Boundaries/MapServer"
		    })
                })
            ]
        })
    ]
});

var layerSwitcher = new LayerSwitcher({
    tipLabel: 'Légende' // Optional label for button
});
map.addControl(layerSwitcher);

console.log('layerswitcher loaded');
