import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Button, Tooltip } from 'reactstrap';
import Map46 from "./map"

export default class Home extends Component {
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
            <Fragment>
            <Container>
                <Row>
                    <Col>
                    map header
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
            </Fragment>
        );
    }
}

/*
const TestLayout = () => (
    <h1>test return code exceptional 123</h1>
);
export default TestLayout;
*/
