import Feature from 'ol/Feature'
import Map from 'ol/Map'
import View from 'ol/View'
import Point from 'ol/geom/Point'
import { GPX, KML, EsriJSON, GeoJSON } from 'ol/format'
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style'
import {defaults as defaultInteractions, DragAndDrop} from 'ol/interaction'

var distance = document.getElementById('distance');

var dragAndDropInteraction = new DragAndDrop({
    formatConstructors: [
	    GPX,
	    KML
    ]
});

const pointSource = new VectorSource({
});

const clusterSource = new Cluster({
  distance: parseInt(distance.value, 10),
  source: pointSource
});

let styleCache = {};
const clusterLayer = new VectorLayer({
  source: clusterSource,
  style: (feature) => {
    const size = feature.get('features').length;
    let style = styleCache[size];
    if (!style) {
        let fcolor = "#3399CC"
        if (size < 3) {
            fcolor = "#2040AA"
        }
        if (size <= 1) {
            style = new Style({
                image: new CircleStyle({
                  radius: 8,
                  stroke: new Stroke({
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: '#2040AA'
                  })
                })
            });
        } else {
            style = new Style({
                image: new CircleStyle({
                  radius: 10,
                  stroke: new Stroke({
                    color: '#fff'
                  }),
                  fill: new Fill({
                    color: fcolor
                  })
                }),
                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: '#fff'
                  })
                })
            });
        }
      styleCache[size] = style;
    }
    return style;
  }
});

const osmLayer = new TileLayer({
    source: new OSM()
});

var defaultStyle = {
    'Point': new Style({
    	image: new CircleStyle({
    	    fill: new Fill({
    		color: 'rgba(0,128,128,0.5)'
    	    }),
    	    radius: 5,
    	    stroke: new Stroke({
    		color: '#ff0',
    		width: 1
    	    })
    	})
    }),
    'LineString': new Style({
    	stroke: new Stroke({
    	    color: '#f00',
    	    width: 3
    	})
    }),
    'Polygon': new Style({
    	fill: new Fill({
    	    color: 'rgba(0,255,128,0.5)'
    	}),
    	stroke: new Stroke({
    	    color: '#0ff',
    	    width: 1
       })
    }),
    'MultiPoint': new Style({
    	image: new CircleStyle({
    	    fill: new Fill({
    		color: 'rgba(255,0,255,0.5)'
    	    }),
    	    radius: 5,
    	    stroke: new Stroke({
    		color: '#f0f',
    		width: 1
    	    })
    	})
    }),
    'MultiLineString': new Style({
    	stroke: new Stroke({
    	    color: '#0f0',
    	    width: 3
    	})
    }),
    'MultiPolygon': new Style({
    	fill: new Fill({
    	    color: 'rgba(0,0,255,0.5)'
    	}),
    	stroke: new Stroke({
    	    color: '#00f',
    	    width: 1
    	})
    })
};

let styleFunction = (feature, resolution) => {
    const featureStyleFunction = feature.getStyleFunction();
    if (featureStyleFunction) {
	    return featureStyleFunction.call(feature, resolution);
    } else {
	    return defaultStyle[feature.getGeometry().getType()];
    }
};

dragAndDropInteraction.on('addfeatures', (event) => {
    pointSource.addFeatures(event.features)
    map.getView().fit(pointSource.getExtent());
});

const map = new Map({
    interactions: defaultInteractions().extend([dragAndDropInteraction]),
    layers: [osmLayer, clusterLayer],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2
    })
});


distance.addEventListener('input', function() {
  clusterSource.setDistance(parseInt(distance.value, 10));
});
