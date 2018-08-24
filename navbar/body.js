// body.js

import 'bootstrap/dist/js/bootstrap.min.js';
// import of bootstrap automatically includes jquery and popper

import jquery from 'jquery/dist/jquery.min.js';

jquery(document).ready(function() {
    jquery('#sidebar-collapse').on('click', function() {
	jquery('#sidebar').toggleClass('active');
	console.log("Toggle sidebar");
    });
});

console.log('body.js loaded');

