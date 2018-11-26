// Map.js react-bootstrap-test
//
// I can compose a map here with
// all its various controls such as zoom buttons and scalebars
// and wrap it inside the Map component.
//
import React from 'react';
import { Button } from 'reactstrap';

const ScaleBar = (props) => (
    <div id="scalebar">
        {props.children}
    </div>
);

const Map46 = (props) => (
    <div id="map">
      {props.children}
      A map should go here
      <ScaleBar>Scale: 100 miles</ScaleBar>
    </div>
);

// Put the ScaleBar into the Map namespace.
Map46.ScaleBar = ScaleBar;

export default Map46;
