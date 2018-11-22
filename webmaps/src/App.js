// App.js webmaps
// All this does is declare the basic user interface.
// The real work is done in components included here.

// React
import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom';

// Bootstrap (reactstrap in this case)
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

/*
// My own React components
import Home from './home';
import About from './about';
import Contact from './contact';
import NotFound from './notfound';
*/
import './App.css';

const PrimaryLayout = () => (
    <div>
    <h1>Minimal Layout</h1>
    This is as small as it gets, almost.
    </div>
);
/*
class PrimaryLayout extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render(props) {
        return (
            <Container>
                <Row>
                    <Col>
                        <div class="banner"></div>
                    </Col>
                </Row>

                <Row>
                <Col>
                    <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Layers
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><button id="restToggle">ArcGIS REST Service Group</button></li>
                            <li><button id="streetsToggle">Streets</button></li>
                            <li><button id="watercolorToggle">Watercolor</button></li>
                        </ul>
                    </div>
                </Col>
                </Row>

                <Row>
                <Col>
                    <div class="map" id="map"></div>
                </Col>
                </Row>

                <Row>
                <Col>
                      <a href="gis">County GIS</a> |
                      <a href="help">Help</a> |
                      <a href="faq">FAQ</a>
                </Col>
                <Col>
                        Lat: 46.1234 Lon: -123.12345 USNG: 10Rxxxxxxxxx  Zoom: 10
                </Col>
                <Col>
                        <a href="#demo" class="btn btn-info" data-toggle="collapse">About Map 46</a>
                        <div id="demo" class="collapse">
                             <h3>Getting started! Just a logo so far.</h3>
                        </div>
                        <a href="about"><img src="../map46.svg" width="48" height="48" /></a>
                </Col>
                </Row>
            </Container>
        );
    }
}
*/

const App = () => (
    <BrowserRouter>
    <PrimaryLayout />
    </BrowserRouter>
)
export default App;

console.log('App loaded.')
