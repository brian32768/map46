import Map from 'ol/Map.js';
import View from 'ol/View.js';
import MVT from 'ol/format/MVT.js';
import VectorTileLayer from 'ol/layer/VectorTile.js';
import VectorTileSource from 'ol/source/VectorTile.js';

var taxlots = "https://tiles.arcgis.com/tiles/l89P2qlKPxgrFDLw/arcgis/rest/services/Taxlots_wm/VectorTileServer/tile/{z}/{y}/{x}.pbf";
var taxlot_layer = new VectorTileLayer({
    source: new VectorTileSource({
	format: new MVT(),
	url: taxlots
    })
});

//var basemap = 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf';

var basemap = "https://maps.tilehosting.com/data/v3/{z}/{x}/{y}.pbf?key=oldTeLsOq24wfrAW6JQ5";

var map = new Map({
    target: 'map',
    view: new View({
	center: [-13784553, 5762546],
	zoom: 11, minZoom: 10, maxZoom: 19
    }),
    layers: [
    ]
});

map.on('pointermove', showInfo);

var info = document.getElementById('info');
function showInfo(event) {
    var features = map.getFeaturesAtPixel(event.pixel);
    if (!features) {
        info.innerText = '';
        info.style.opacity = 0;
        return;
    }
    var properties = features[0].getProperties();
    info.innerText = JSON.stringify(properties, null, 2);
    info.style.opacity = 1;
}
