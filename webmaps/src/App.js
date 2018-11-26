// App.js webmaps
// All this does is declare the basic user interface.
// The real work is done in components included here.

// React
import React, { Component } from 'react';
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom';

// Bootstrap (reactstrap in this case)
import {
    Container, Row, Col,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

// My own React components
import Home from './home';
/*
import About from './about';
import Contact from './contact';
import NotFound from './notfound';
*/
import './App.css';

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
{/* NAVBAR ====================================================== */}
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
{/* HOME ======================================================== */}
                    <Home />
                </Col>
                </Row>
            </Container>
        );
    }
}

const App = () => (
    <BrowserRouter>
    <PrimaryLayout />
    </BrowserRouter>
)
export default App;

console.log('App loaded.')
