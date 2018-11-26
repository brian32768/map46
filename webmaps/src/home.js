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
                    <div class="dropdown">

                      <button class="btn btn-primary" data-toggle="collapse" data-target="leftsidebar">left</button>
                        <button class="btn btn-primary" data-toggle="collapse" data-target="rightsidebar">right</button>
                        <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                            Layers
                            <span class="caret"></span>
                        </button>
                        <ul class="dropdown-menu">
                  <li><button id="cloudToggle">Clouds</button></li>
                  <li><button id="streetsToggle">Streets</button></li>
                  <li><button id="highesthitToggle">Highest Hit Hillshade</button></li>
                  <li><button id="naip2009Toggle">NAIP 2009 1/2 meter</button></li>
                  <li><button id="naip2011Toggle">NAIP 2011 1 meter</button></li>
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
                        crawl text thing here
                        <a href="gis">County GIS</a> |
                        <a href="help">Help</a> |
                        <a href="faq">FAQ</a>
                        Lat: 46.1234 Lon: -123.12345 USNG: 10Rxxxxxxxxx  Zoom: 10

                        <a id="map46logo" href="about"></a>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default Home;
