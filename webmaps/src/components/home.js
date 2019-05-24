
import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { Container, Row, Col, Button, Tooltip } from 'reactstrap'
import { fromLonLat } from 'ol/proj'
import Map46 from './map'
import { Geolocation } from '../geolocation'

class Home extends Component {
    static state = {
        tooltipOpen: false
    };

    constructor(props) {
        super(props);
//        this.toggle = this.toggle.bind(this);
        this.geolocation = new Geolocation();
    }

    toggle() {
       this.setState({
         tooltipOpen: !this.state.tooltipOpen
       });
     }

     gotoXY = (coord,zoom) => {
         if (coord[0]==0 || coord[1]==0 || zoom==0) return;
         console.log('home.gotoXY', coord, zoom);
         this.props.setMapCenter(coord, zoom);
     }

     gotoGeolocation = (e) => {
         const defaultZoom = 17;
         if (!this.geolocation.valid)
             return;
/*
         this.setState({
             displayPoint: this.geolocation.coord,
             displayZoom: defaultZoom
         });
         */
         let coord_wm = fromLonLat(this.geolocation.coord);
         this.gotoXY(coord_wm, defaultZoom);
     }

    render(props) {
        return (
            <Fragment>
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
                        <Button tag="button" onClick={ this.gotoGeolocation }>Geolocate</Button>
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

const mapStateToProps = (state) => (Object.assign({},
    state.mapExtent,
));
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
