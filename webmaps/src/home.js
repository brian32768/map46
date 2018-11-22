import React from 'react';
import { Container, Row, Col, Button, Tooltip } from 'reactstrap';

// My own React components
//import Map from "./Map.js";

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
                    map navbar
                    </Col>
                </Row>
                <Row>
                    <Col>
                    map
                    </Col>
                    <Col>
                    sidebar
                    </Col>
                </Row>
                <Row>
                    <Col>
                    mouse location
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default Home;
