// body.js

import {getDatestamp, datestamp} from './mock.js';

var fill_our_container = function(s) {
    document.getElementById('test').innerHTML = s;
}

function intervalHandler(evt) {
    document.getElementById('header').innerHTML = getDatestamp();
}

// Here's an event handler that calls a function in mock.
function clickHandler(evt) {
    datestamp(fill_our_container);
    console.log("click");
};

var btn = document.getElementById('ici');
btn.onclick = clickHandler;

var timed = setInterval(intervalHandler, 1000);

console.log('body loaded');
