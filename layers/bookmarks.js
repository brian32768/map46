// bookmarks.js

// This object uses localStorage to persist the bookmarks.
import GeoBookmark from 'ol-ext/control/GeoBookmark.js';
import {transform as Transform} from 'ol/proj';

var bookmark_list = {
    editable: false,
    marks: {
	'Arch Cape': {
	    pos:Transform([-123.96, 45.81], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Astoria': {
	    pos:Transform([-123.84, 46.18], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Cannon Beach': {
	    pos:Transform([-123.96, 45.89], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Gearhart': {
	    pos:Transform([-123.92, 46.03], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Hammond': {
	    pos:Transform([-123.95, 46.20], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Seaside': {
	    pos:Transform([-123.92, 45.99], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	},
	'Warrenton': {
	    pos:Transform([-123.93, 46.17], 'EPSG:4326', 'EPSG:3857'),
	    zoom:15,
	    permanent: true
	}
    }
};

export function Bookmarks() {
    return new GeoBookmark(bookmark_list);
}

console.log("bookmarks loaded.");

// that's all!
