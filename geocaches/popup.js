// popup.js
//

import Overlay from 'ol/Overlay.js';

/* 
 FIXME

 I could probably refactor this to make it more object oriented,
 it exposes too much I think. But it's Javascript not C#
 and hey! I only learned how to write objects TODAY :-)

 FIXME

 This code shows a popup for geolocation point too. Interesting. It's ugly though.
*/

export class Popup {
    constructor() {
	// Elements that make up the popup.
	this.container = document.getElementById('popup-content');
	this.closer    = document.getElementById('popup-closer');
	
	// Create an overlay to anchor the popup to the map.
	this.overlay = new Overlay({
	    element: document.getElementById('popup'),
	    autoPan: true,
	    autoPanAnimation: {
		duration: 250
	    }
	});

	// Close the popup if the close button is clicked.
	this.closer.onclick = function(){
	    this.overlay.setPosition(undefined);
	    this.closer.blur();
	};
    }

    // Close the popup if one is open.
    close() {
	this.overlay.setPosition(undefined);
	this.closer.blur();
    }
};
