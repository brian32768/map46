import React, { useState } from 'react'
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
import { connect } from 'react-redux'

// Import everything as an object so that we can look up a component using its name.
import * as components from './components'

import "bootstrap/dist/css/bootstrap.min.css"
import '../config/config.scss'
import '../webmaps.scss'
import './App.css'

const App = ({ page }) => {
    const Component = components[page]
    const [collapse, setCollapse] = useState(false);
    const toggle = () => {
        setCollapse(!collapse);
    }
    return (
        <>
            <Container>
                <Row><Col>
                {/* NAVBAR ====================================================== */}
                    <Navbar color="light" light expand="md">
                        <NavbarBrand><span id="sitelogo"></span><span id="sitename"></span></NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={collapse} navbar>
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
                <Component />
                </Col></Row>

            </Container>
        </>
    )
}
App.propTypes = {
}
const mapStateToProps = (state) => ({
    page: state.page,
});

export default connect(mapStateToProps)(App);
