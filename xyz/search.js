// A search control object
//

import SearchNominatim from 'ol-ext/control/SearchNominatim';
import {Vector as VectorLayer} from 'ol/layer';
import {Vector as VectorSource} from 'ol/source';
import {Style, Circle, Stroke, Fill} from 'ol/style';

export class Search {

    constructor() {
	this.mapControl = new SearchNominatim({
	    //target: $(".options").get(0),
	    polygon: $("#polygon").prop("checked"),
	    position: true	// Search, with priority to geo position
	});

	// Current selection for search 
	this.selectionlayer = new VectorLayer({
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
    } // constructor

    toString() {
	return 'search control';
    }
}
