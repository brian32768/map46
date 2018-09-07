// body.js

// Modules are one pattern for organizing your code.
//import {m_ec3} from './module_ec3.js';  // old terse and confusing syntax
import {getDatestamp as ec6_datestamp} from './module_ec6.js';  // new and improved syntax
import {m_ec3} from './module_ec3.js';
//    console.log(m_ec3.getDatestamp());

// Classes are another pattern for organization.
import {Thing, TallThing} from './class_ec6.js';

function intervalHandler(evt) {
    document.getElementById('header').innerHTML = 'EC6 time is ' + ec6_datestamp();
    document.getElementById('footer').innerHTML = 'EC3 time is ' + m_ec3.getDatestamp();
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
