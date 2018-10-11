// body.js

// Modules are one pattern for organizing your code.
import {m_es3} from './module_es3.js';  // old terse and confusing syntax
//console.log(m_es3.getDatestamp());
import {getDatestamp as es6_datestamp} from './module_es6.js';  // new and improved syntax

// Classes are another pattern for organization.
import {Thing, TallThing} from './class_es6.js';

function intervalHandler(evt) {
    document.getElementById('header').innerHTML = 'ES6 time is ' + es6_datestamp();
    document.getElementById('footer').innerHTML = 'ES3 time is ' + m_es3.getDatestamp();
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
