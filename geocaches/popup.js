// popup.js
//

import Overlay from 'ol/Overlay.js';

// Elements that make up the popup.
var popup_container = document.getElementById('popup');
var popup_closer    = document.getElementById('popup-closer');

export var popupContainer = document.getElementById('popup-content');

// Create an overlay to anchor the popup to the map.
export var popupOverlay = new Overlay({
    element: popup_container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});

// Handler for the popup close button
popup_closer.onclick = function() {
    popupOverlay.setPosition(undefined);
    popup_closer.blur();
    return false;
};

