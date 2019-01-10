import React, { Component, Fragment } from 'react';
//import { Button } from 'reactstrap';

import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM  from "ol/source/OSM";
import 'ol/ol.css';

const starting_location = {center: [-13785000, 5807600], zoom: 14}; // astoria downtown

const ScaleBar = (props) => (
    <div id="scalebar">
        {props.children}
    </div>
);

export default class Map46 extends Component {

    componentDidMount() {
        let map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View(starting_location)
        });
    }

    render(props) {
        return (
            <Fragment>
                <ScaleBar>Scale: 100 miles</ScaleBar>
                <div id="map" />
            </Fragment>
        );
    }
}

// Put the ScaleBar into the Map namespace.
Map46.ScaleBar = ScaleBar;
