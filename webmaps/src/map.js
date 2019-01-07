// Map.js react-bootstrap-test
//
// I can compose a map here with
// all its various controls such as zoom buttons and scalebars
// and wrap it inside the Map component.
//
import React from 'react';
//import { Button } from 'reactstrap';

// Inspired by the book "OpenLayers 3.x Cookbook Second Edition"

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM  from "ol/source/OSM";
import 'ol/ol.css';

// First we do the map unwrapped. The littlest one we can.

const starting_location = {center: [-13785000, 5807600], zoom: 14}; // astoria downtown

const ScaleBar = (props) => (
    <div id="scalebar">
        {props.children}
    </div>
);

class Map46 extends React.Component {
    constructor(props) {
        super(props);
    }
    render(props) {
        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View(starting_location)
        });

        return (
            <div id="map46">
                <ScaleBar>Scale: 100 miles</ScaleBar>
            </div>
        );
    }
}

// Put the ScaleBar into the Map namespace.
Map46.ScaleBar = ScaleBar;

console.log('openlayers5 loaded');
export default Map46;
