import Map from 'ol/Map';
import View from 'ol/View';
import {Tile as TileLayer, Image as ImageLayer} from 'ol/layer';
import {OSM, Stamen} from 'ol/source';
import {Group as LayerGroup} from 'ol/layer';
import ImageArcGISRest from 'ol/source';

export function map_w_scroller() {

    var thunderforestAttributions = [
        'Tiles &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>',
        OSM.ATTRIBUTION
    ];

    var map = new Map({
        target: 'map',
        layers: [
            new LayerGroup({
                'title': 'Base maps',
                layers: [
                    new TileLayer({
                        title: 'Stamen - Water color',
                        type: 'base',
                        visible: false,
                        source: new Stamen({
                            layer: 'watercolor'
                        })
                    }),
                    new TileLayer({
                        title: 'Stamen - Toner',
                        type: 'base',
                        visible: false,
                        source: new Stamen({
                            layer: 'toner'
                        })
                    }),
                    new TileLayer({
                        title: 'Thunderforest - OpenCycleMap',
                        type: 'base',
                        visible: false,
                        source: new OSM({
                            url: 'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
                            attributions: thunderforestAttributions
                        })
                    }),
                    new TileLayer({
                        title: 'Thunderforest - Outdoors',
                        type: 'base',
                        visible: false,
                        source: new OSM({
                            url: 'http://{a-c}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
                            attributions: thunderforestAttributions
                        })
                    }),
                    new TileLayer({
                        title: 'Thunderforest - Landscape',
                        type: 'base',
                        visible: false,
                        source: new OSM({
                            url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
                            attributions: thunderforestAttributions
                        })
                    }),
                    new TileLayer({
                        title: 'Thunderforest - Transport',
                        type: 'base',
                        visible: false,
                        source: new OSM({
                            url: 'http://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                            attributions: thunderforestAttributions
                        })
                    }),
                    new TileLayer({
                        title: 'Thunderforest - Transport Dark',
                        type: 'base',
                        visible: false,
                        source: new OSM({
                            url: 'http://{a-c}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
                            attributions: thunderforestAttributions
                        })
                    }),
                    new TileLayer({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new OSM()
                    })
                ]
            }),
            new LayerGroup({
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
        ],
        view: new View({
            center: Transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });

    map.addControl(new LayerSwitcher());

}

console.log("module scroll.js loaded");
