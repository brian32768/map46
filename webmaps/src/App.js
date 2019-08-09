import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'; // eslint-disable-line no-unused-vars
import MainNavbar from './components/navbar'; // eslint-disable-line no-unused-vars

// Import everything as an object so that we can look up a component using its name.
import * as components from './components'

const App = ({ page, center, zoom }) => {
    const Component = components[page]; // eslint-disable-line no-unused-vars
    return (
        <>
            <Container>
                <Row><Col>
                    <MainNavbar/>
                </Col></Row>
                <Row><Col>
                <Component />
                </Col></Row>

            </Container>
        </>
    )
}
App.propTypes = {
    page: PropTypes.string,
}
const mapStateToProps = (state) => ({
    page: state.page,
    center: state.map.center,
    zoom:   state.map.zoom,
});

export default connect(mapStateToProps)(App);
