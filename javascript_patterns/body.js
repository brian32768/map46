// body.js

import {getDatestamp, datestamp} from './mock.js';
import {Thing, TallThing} from './thing.js';

function intervalHandler(evt) {
    document.getElementById('header').innerHTML = 'The turtle time is ' + getDatestamp();
}

var btn = document.getElementById('ici');
btn.onclick = clickHandler;

var timed = setInterval(intervalHandler, 1000);

// class tests
// Get an instance of our object
var obelisk = new Thing('Diviner');
obelisk.length = 10;
obelisk.width  = 10;
obelisk.height = 100;

// Show me its properties
function clickHandler(evt) {
    var content = '';
    // enumerate the thing's properties.
    for (var p in obelisk) {
 	content += p + ' = ' + obelisk[p] + '<br />';
    }
    document.getElementById('test').innerHTML = content;
    console.log("click");
}

console.log('Object: ' + obelisk); // calls toString() method
console.log('Object volume: ' + obelisk.volume());
console.log('Thing foo: ' + Thing.foo() + ' bar: ' + Thing.bar);

var t = new TallThing('Terrapene Mundi', 1000);
console.log(t); // Dump the entire object, toString() not called.
console.log(t.volume());

console.log('body loaded');
