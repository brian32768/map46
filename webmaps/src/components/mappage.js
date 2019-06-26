import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import MapNavbar from './mapnavbar'
import Map46 from './map46'

const Map = () => (
    <>
        <Container>
            <Row>
                <Col>
                <MapNavbar />
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
)
export default Map;
