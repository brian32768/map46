import React from 'react'
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
import { About, Contact, Faq, Help, Home, Map, News, NotFound } from './components'

import "bootstrap/dist/css/bootstrap.min.css"
import '../config/config.scss'
import '../webmaps.scss'
import './App.css'

import { Provider } from 'react-redux'
//import { PersistGate } from 'redux-persist/integration/react'
import configStore from './redux/configstore'
import { connect } from 'react-redux'

const { store, persistor } = configStore();

class PrimaryLayout extends React.Component {
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
        <Provider store={store}>
            <Container>
                <Row><Col>
                {/* NAVBAR ====================================================== */}
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><span id="sitelogo"></span><span id="sitename"></span></NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.collapse} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/">Map</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/help">Help</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/faq">FAQ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/news">News</NavLink>
                            </NavItem>
                            <NavItem>
                                <a id="map46logo" href="about"></a>
                            </NavItem>
                        </Nav>
                        </Collapse>
                    </Navbar>
                </Col></Row>

                <Row><Col>
                    <Switch>
                        <Route exact path="/"        component={Home} />
                        <Route       path="/help"    component={Help} />
                        <Route       path="/faq"     component={Faq} />
                        <Route       path="/news"    component={News} />
                        <Route       path="/about"   component={About} />
                        <Route       path="/404"     component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </Col></Row>

            </Container>
        </Provider>
    )}
}

const App = () => (
    <BrowserRouter>
    <PrimaryLayout />
    </BrowserRouter>
)
export default App;
