import React, { Component } from 'react'
import {BrowserRouter, Link, Route, Redirect, Switch} from 'react-router-dom'

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
} from 'reactstrap'

// My own React components
import Home from './home'
import { Help } from './help'
import { FAQ } from './faq'
import { Contact } from './contact'
import { NotFound } from './notfound'

import "bootstrap/dist/css/bootstrap.min.css"
import 'ol/ol.css'
import 'ol-ext/dist/ol-ext.css'
import 'ol-ext/control/Permalink.css'
import '../config/config.scss'
import '../webmaps.scss'
import './App.css'

class PrimaryLayout extends Component {
    constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
      this.state = {
        collapse: false
      };
    }

    toggle() {
      this.setState({
        collapse: !this.state.collapse
      });
    }

    render(props) {
        return (
            <Container>
                <Row><Col>
                {/* NAVBAR ====================================================== */}
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><span id="sitelogo"></span><span id="sitename"></span></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.collapse} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/help">Help</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/faq">FAQ</NavLink>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                </Col></Row>

                <Row><Col>
                    <Switch>
                        <Route exact path="/"        component={Home} />
                        <Route       path="/help"    component={Help} />
                        <Route       path="/faq"     component={FAQ} />
                        <Route       path="/contact" component={Contact} />
                        <Route       path="/404"     component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </Col></Row>

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
