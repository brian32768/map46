// body.js javascript_patterns
//
// This does not work because there is a bug in Parcel, #1440
//import dotenv from 'dotenv';
//dotenv.config();

// I can still simply read environment though.
let password = process.env.SECRETPASSWORD;
console.log("password: ", password);

// ------------------------------------------------------------------------
// What are the curly braces for on the import line, and when should I use them and when not?
// https://stackoverflow.com/questions/36795819/when-should-i-use-curly-braces-for-es6-import#36796281

// 1. Define a "default" object (a class in this case) in A.js, like export default class {};
// Then you can access it here and rename it if you want.
import Aye from './src/A';

// 2. I can gather imports into one file (index.js) and reexport under same or different names,
// then I can do this, jamming all 3 onto one line even though A is a default export from A.js
// Using the name "index.js" is like "index.html", I don't have to name it explicitly, just the folder it's in.
import { A,B,C } from "./src";

let a = new A();
let b = new B();

console.log('a =', a.toString());
console.log('b =', b.toString())
console.log('C =', C);

// ------------------------------------------------------------------------
// Okay, I know how to explicitly import things now, but how do I import everything from a package?
// For example I want to be able to reference ol.proj.Projection()
// without having to rewrite it to be
//     import {Projection} from "ol/proj"
//     var p = new Projection();
// Well, IF I knew how I would avoid doing this because it defeats the whole idea of "load only what you need"...
// Just fix the damn code!

// ------------------------------------------------------------------------
// Modules are one pattern for organizing your code.
// Here are two patterns for calling a function, old es3 and newer es6
//
import {m_es3} from './src/module_es3.js';
console.log(m_es3.getDatestamp());
//
import {getDatestamp as es6_datestamp} from './src/module_es6.js';
console.log(es6_datestamp());

// ------------------------------------------------------------------------
// Classes are another pattern for organization.
import {Thing, TallThing} from './src/class_es6.js';

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
