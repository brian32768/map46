import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../actions'
import { Container, Row, Col, Button, Tooltip } from 'reactstrap'
import { fromLonLat } from 'ol/proj'
import Map46 from './map'
import { Geolocation } from '../geolocation'

const DEFAULT_ZOOM = 17;

const Home = ({ center, setMapCenter }) => {
    const geolocation = new Geolocation();

    const gotoXY = (coord, zoom) => {
        if (coord[0]==0 || coord[1]==0 || zoom==0) return;
        console.log('home.gotoXY', coord, zoom);
        setMapCenter(coord, zoom);
    }

    const gotoGeolocation = (e) => {
        if (!geolocation.valid)
            return;
        gotoXY(geolocation.coord, DEFAULT_ZOOM);
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <button data-toggle="collapse" data-target="leftsidebar">left</button>
                        <button data-toggle="collapse" data-target="rightsidebar">right</button>
                        <button type="button" data-toggle="dropdown">
                            Layers
                        </button>
                        <ul>
                            <li><button id="cloudToggle">Clouds</button></li>
                            <li><button id="streetsToggle">Streets</button></li>
                            <li><button id="highesthitToggle">Highest Hit Hillshade</button></li>
                        </ul>
                        <Button tag="button" onClick={ gotoGeolocation }>Geolocate</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Map46 />
                    </Col>
                    <Col>
                        sidebar
                    </Col>
                </Row>
            </Container>
        </>
    );
}
//Home.propTypes = {
//}
const mapStateToProps = (state) => ({
});
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
