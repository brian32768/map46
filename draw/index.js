import {Map, View} from 'ol'
import {Draw, DrawEvent, Modify, Snap} from 'ol/interaction'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer'
import {OSM, Vector as VectorSource} from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style'

var raster = new TileLayer({
    source: new OSM()
});

var source = new VectorSource();
var vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: 'rgba(255, 0, 255, 0.2)' // thin magenta
      }),
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: '#ff0033' // red dots
        })
      })
    })
});

var map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
      center: [-11000000, 4600000],
      zoom: 4
    })
});

var draw, snap; // global so we can remove them later
var typeSelect = document.getElementById('type');

function handleDrawEnd(ev) {
    console.log("DrawEvent", ev)
    console.log("my draw", draw);
}

function handleAddFeature(ev) {
    console.log("AddFeature", ev)
}

source.on("addfeature", handleAddFeature)
console.log("Sauce=",source)

var modify = new Modify({source: source});
map.addInteraction(modify);

function addInteractions() {
    draw = new Draw({
      source: source,
      type: typeSelect.value
    });
    draw.addEventListener("drawend", handleDrawEnd);
    map.addInteraction(draw);
    snap = new Snap({source: source});
    map.addInteraction(snap);
}

/**
* Handle change event.
*/
typeSelect.onchange = function() {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
};

addInteractions();
