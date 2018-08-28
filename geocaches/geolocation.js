// geolocation.js
// Report our current position

import Geolocation from 'ol/Geolocation.js';
import Point from 'ol/geom/Point.js';

// Build a descriptive string and let the caller handle display it.
// String should go BLANK when track is turned off.

var tracking_toggled = false;

function el(id) {
    return document.getElementById(id);
}

export class Geolocator {

    
    constructor(view, position_feature, accuracy_feature, headingChanged) {

	var geolocation = new Geolocation({
	    trackingOptions : { enableHighAccuracy: true },
	    projection : view.getProjection()
	});

	this.old_heading = 0;

	el('track').addEventListener('click', function() {
	    el('track').classList.toggle("tracking_on");
	    var tracking = el('track').classList.contains("tracking_on");
	    if (tracking) {
		// Center on map when we get the next position update
		tracking_toggled = true;
	    } else {
		// Hide the position display
		position_feature.setGeometry(null);
		accuracy_feature.setGeometry(null);
	    }
	    geolocation.setTracking(tracking);
	    console.log("Tracking " + tracking);
	});

	// === Install handlers ===

	// Handle display of GPS metadata when the GPS data changes.
	geolocation.on('change', function() {

	    var posacc  = geolocation.getAccuracy();
	    var alt     = geolocation.getAltitude();
	    var altacc  = geolocation.getAltitudeAccuracy();
	    var heading = geolocation.getHeading();
	    var speed   = geolocation.getSpeed();

	    /* Uncomment this to test with real numbers.
	    posacc = 10;
	    alt = 100;
	    altacc = posacc * 2;
	    heading = 3.14;
	    speed = 6;
	    */
	    
	    var msg = '';
	    if (typeof posacc != 'undefined') {
		msg += ' accuracy: ' + Math.round(posacc * 3.28084) + "'";
	    }
	    if (typeof alt != 'undefined') {
		msg += ' elev: ' + Math.round(alt * 3.28084) + "'";
	    }
	    if (typeof altacc != 'undefined') {
		msg += ' elev acc: ' + Math.round(altacc * 3.28084) + "'";
	    }

	    if (typeof heading != 'undefined') {
		// If heading changes more than 10% then callback to rotate map.
		if (heading < (this.old_heading * .90)
		    || heading > (this.old_heading * 1.10)) {
		    headingChanged(heading);
		    this.old_heading = heading;
		}
		msg += ' head: ' + Math.round(new_heading * 57.29578) + '°';
	    }

	    if (typeof speed != 'undefined') {
		msg += ' speed: ' + Math.round(speed * 2.2369362920544025) + ' mph';
	    }
	    
	    el('gpsmeta').innerText = msg;
	});

	// Handle geolocation change of GPS error.
	geolocation.on('error', function(error) {
	    var info = document.getElementById('gpsinfo');
	    info.innerHTML = error.message;
	    info.style.display = '';
	});

	// Handle dot that shows our position on the map.
	geolocation.on('change:position', function() {
	    var coordinates = geolocation.getPosition();
	    position_feature.setGeometry(coordinates ? new Point(coordinates) : null);

	    // If we just got position after tracking was activated, pan to show us at center of map.
	    if (tracking_toggled) {
		view.setCenter(coordinates);
		tracking_toggled = false;
		console.log("Panned to GPS");
	    }
	});

	// Handle change of accuracy on map. Ring gets bigger or smaller.
	geolocation.on('change:accuracyGeometry', function() {
	    accuracy_feature.setGeometry(geolocation.getAccuracyGeometry());
	});
    }
}

console.log('geolocation loaded.');
// That's all!
