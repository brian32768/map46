// geolocation.js
//
import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';

/* FIXME -- This is tied too tightly to the UI!! 

I think a good way to handle it would be to build a descriptive string
and let the caller handle display it.

String should go BLANK when track is turned off.

*/

function el(id) {
    return document.getElementById(id);
}

export class Geolocator {
    constructor(view, position_feature, accuracy_feature,) {
	var geolocation = new Geolocation({
	    trackingOptions : { enableHighAccuracy: true },
	    projection : view.getProjection()
	});

	el('track').addEventListener('click', function() {
	    el('track').classList.toggle("tracking_on");
	    var tracking = el('track').classList.contains("tracking_on");
	    geolocation.setTracking(tracking);
	    console.log("Tracking " + tracking);
	});

	// Install handlers

	// Update the position metadata display when the GPS data changes.
	geolocation.on('change', function() {
	    el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
	    el('altitude').innerText = geolocation.getAltitude() + ' [m]';
	    el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
	    el('heading').innerText = geolocation.getHeading() + ' [rad]';
	    el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
	});

	// Handle geolocation change of GPS error.
	geolocation.on('error', function(error) {
	    var info = document.getElementById('gpsinfo');
	    info.innerHTML = error.message;
	    info.style.display = '';
	});

	// Handle change of position on map.
	geolocation.on('change:position', function() {
	    var coordinates = geolocation.getPosition();
	    position_feature.setGeometry(coordinates ? new Point(coordinates) : null);
	    view.setCenter(coordinates);
	});

	// Handle change of accuracy on map.
	geolocation.on('change:accuracyGeometry', function() {
	    accuracy_feature.setGeometry(geolocation.getAccuracyGeometry());
	});
    }
}

console.log('geolocation loaded.');
// That's all!
