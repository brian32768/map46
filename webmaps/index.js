// index.js webmaps
//
import React from 'react';
import { render } from 'react-dom';
import App from './src/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';

render(
    <App />, document.getElementById("app")
);

console.log('index.js loaded');
