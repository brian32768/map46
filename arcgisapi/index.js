import React from 'react';
import * as ReactDOM from 'react-dom';
import { Map } from '@esri/react-arcgis';

ReactDOM.render(
  <Map loaderOptions={{ version: "4.12", css: true }}/>,
  document.getElementById('container')
);
