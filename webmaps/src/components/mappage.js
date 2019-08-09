import React from 'react'; // eslint-disable-line no-unused-vars
import { Container, Row, Col } from 'reactstrap'; // eslint-disable-line no-unused-vars
import MapNavbar from './mapnavbar'; // eslint-disable-line no-unused-vars
import Map46 from './map46'; // eslint-disable-line no-unused-vars

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
