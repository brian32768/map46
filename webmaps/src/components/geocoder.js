import React from 'react'
import Select from 'react-select'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import { Button } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import axios from 'axios'
import { fromLonLat } from 'ol/proj'

// We're querying any of these Nomimatim geocoders via Axios to find addresses in Clatsop county.

const nominatim = "https://nominatim.openstreetmap.org/search?format=json"

const locationiqKey = process.env.LOCATIONIQ_KEY;
if (typeof locationiqKey === 'undefined') console.error("LOCATIONIQ_KEY is undefined.");
const locationiq = "https://us1.locationiq.com/v1/search.php?format=json&key=" + locationiqKey

// https://opencagedata.com/api
// NOTE NOTE Opencage results are not in the standard nominatim format
const opencageKey = process.env.OPENCAGE_KEY;
if (typeof opencageKey === 'undefined') console.error("OPENCAGE_KEY is undefined.");
const opencage = "https://api.opencagedata.com/geocode/v1/json?key=" + opencageKey
    + '&proximity=[46,-123]'
    + '&pretty=1'

const geocodeServer = nominatim
        + '&viewbox=' + encodeURIComponent('-123.35,45.7,-124.17,46.3') + '&bounded=1'
        + '&countrycodes=us'
        + '&addressdetails=1';

const answersKey = 'place_id'
const answersColumns = [
        {dataField:'place_id', text: 'ID'},
        {dataField:'display_name', text: 'Name'},
        {dataField:'type', text: 'Type'},
        {dataField:'lat', text: 'Latitude'},
        {dataField:'lon', text: 'Longitude'}
    ];

// There is a state provided service but it uses Esri geocoder so it's clumsy
// https://www.oregon.gov/geo/Pages/geoservices.aspx
//const oregonExplorer  = "https://navigator.state.or.us/arcgis/rest/services/Locators/gc_Composite/GeocodeServer"

class Geocoder extends React.Component {
    state = {
        suggestions: [],
        input: '',
        answers: []
    }

// Refer to https://react-select.com/async for tips.

    onInputChange = (e) => {
        this.setState({ input: e });
        // rebuild the selection list
        this.setState({
            suggestions: [
                { label: e, value: e }
            ]
        });
    }

    onChange = (e) => {
        console.log('onChange', e, e.value);
        this.requestGeocode(e.value);
    }

    addToTable(features) {
        const rows = [];
        let lat = 0;
        let lon = 0;

        if (features.length > 0) {
            features.forEach( (feature) => {
                const attributes = {};
                // Copy the data from each feature into a list
                //const allprops = feature.getProperties();
                answersColumns.forEach ( (column) => {
                    try {
                        const text = feature[column.dataField];
                        //const url = taxmapsBaseUrl + '/tp_' + text + '.pdf';
                        attributes[column.dataField] = text;
                        if (column.dataField == 'lat') lat = text;
                        if (column.dataField == 'lon') lon = text;
                        //(typeof column.formatter !== 'undefined')?
                        //    column.formatter(url,text) : text;
                    } catch {
                        console.log("No column:", column)
                    };
                });
                rows.push(attributes)

            });
        }

        if (rows.length == 1 && lat != 0 && lat != 0) {
            // We have only one result, and it has a position
            const wmcoord = fromLonLat([lon,lat]);
            console.log("Off we go to a new place", wmcoord);
            this.props.setMapCenter(wmcoord, this.props.mapExtent.zoom)
        }
        this.setState({answers: rows});
    }

    requestGeocode = (query) => {
        const url = geocodeServer
            + '&q=' + encodeURIComponent(query);

        axios.get(url)
            .then( (response) => {
                this.addToTable(response.data)
            })
            .catch( (error) => {
                console.log("Search failed", error);
            });
        }

    render() {
        return (
            <>
            input: {this.state.input }
                <Select
                    autoFocus
                    placeholder="search for something"
                    options={ this.state.suggestions }
                    onChange={ this.onChange }
                    onInputChange={ this.onInputChange }
                />
                <BootstrapTable bootstrap4 condensed
                    keyField={ answersKey }
                    columns={ answersColumns }
                    data={ this.state.answers }
                />
            </>
        );
    }
}
const mapStateToProps = (state) => (Object.assign({},
    state.mapExtent,
));
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(Geocoder);
