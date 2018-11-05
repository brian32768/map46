// mock.js
// testing modules

import Overlay from 'ol/Overlay.js';

var popup_container = document.getElementById('popup');
export var popupOverlay = new Overlay(
    {element: popup_container}
);

export function popupClick(evt) {
    console.log("mock click " + evt.pixel);
}

console.log('mock loaded');

