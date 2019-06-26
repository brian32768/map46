import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import MainNavbar from './components/navbar'

// Import everything as an object so that we can look up a component using its name.
import * as components from './components'

const App = ({ page, center, zoom }) => {
    const Component = components[page]
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
