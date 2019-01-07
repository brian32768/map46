import React from 'react';
import { Container, Row, Col, Button, Tooltip } from 'reactstrap';
import Map46 from "./map";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state  = {
            tooltipOpen: false
        };
    }

    toggle() {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
     }

    render(props) {
        return (
            <div>
            <Container>
                <Row>
                    <Col>
                    map header
                    <div>
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
                    </div>

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
                <Row>
                    <Col>
                        <span>crawl text thing here</span>
                        Lat: 46.1234 Lon: -123.12345 USNG: 10Rxxxxxxxxx  Zoom: 10
                        <a id="map46logo" href="about"></a>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

/*
const TestLayout = () => (
    <h1>test return code exceptional 123</h1>
);
export default TestLayout;
*/

export default Home;
