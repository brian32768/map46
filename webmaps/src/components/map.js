import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setMapCenter } from '../redux/actions'
import Select from 'react-select'
import { Button } from 'reactstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import { transform } from 'ol/proj'
import { toStringXY } from 'ol/coordinate'
import { Collection } from 'ol'
import { platformModifierKeyOnly } from 'ol/events/condition'
import { toLonLat } from 'ol/proj'
import { toStringHDMS } from 'ol/coordinate'
import { Vector as VectorSource } from 'ol/source'
import { bbox as bboxStrategy } from 'ol/loadingstrategy'
import { Map, View, Feature, Overlay, control, geom, interaction, layer} from '@map46/ol-react'
import { myGeoServer,workspace, wgs84, wm, astoria_ll } from '@map46/ol-react/utils'
import { buildStyle } from '@map46/ol-react/style'
import { DataLoader } from '@map46/ol-react/layer/dataloaders'
import Geocoder from './geocoder'
import { fromLonLat } from 'ol/proj'


const bingmapsKey = process.env.BINGMAPS_KEY;
if (typeof bingmapsKey === 'undefined') console.error("BINGMAPS_KEY is undefined.");

/*
TODO = if a photo will not be visible in current extent, disable it in the list
*/
const astoriagis = "http://gis.astoria.or.us/cgi-bin/mapserv.exe?SERVICE=WMS&VERSION=1.1.1";
const oregonExplorer = "https://imagery.oregonexplorer.info/arcgis" + '/rest' + '/services';
const aerials = [
    { label: "no photo", value: {source: "WMS", url: ""}  },
    { label: "Astoria 1966", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_bw_1966.map&LAYERS=aerials1966" }},
    { label: "Astoria 1976", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_bw_1976.map&LAYERS=aerials1976" }},
    { label: "Astoria 1987", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_bw_1987.map&LAYERS=aerials1987" }},
    { label: "Astoria 1994", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_bw_1994.map&LAYERS=aerials1994" }},
    { label: "Astoria 2004", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_hires_2004.map&LAYERS=aerials2004" }},
    { label: "Astoria 2010", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fastoria_aerial_hires_2010.map&LAYERS=aerials2010" }},
    { label: "Astoria 2015", value: {source: "WMS", url: astoriagis + "&MAP=%2Fms4w%2Fapps%2Fastoria31_Public%2Fhtdocs%2Fastoria31%2Fmaps%2F.%2Fair_2015.map&LAYERS=air_2015"}},

    { label: "NAIP 2016", value: {source: 'ArcGISRest', url: oregonExplorer + "/NAIP_2016/NAIP_2016_WM/ImageServer'; // + '/WMSServer?Layers=0" }},
    { label: "NAIP 2014", value: {source: "WMS", url: oregonExplorer + "/NAIP_2014/NAIP_2014_WM/ImageServer/WMSServer?Layers=0" }},
    { label: "NAIP 2012", value: {source: "WMS", url: oregonExplorer + "/NAIP_2012/NAIP_2012_WM/ImageServer/WMSServer?Layers=0" }},
    { label: "NAIP 2011", value: {source: "WMS", url: oregonExplorer + "/NAIP_2011/NAIP_2011_WM/ImageServer/WMSServer?Layers=0" }},
    // there are more NAIP photos...

    { label: "DOGAMI BareEarthHS",  value: { source: 'WMS',  url: "https://gis.dogami.oregon.gov/arcgis/services/Public/BareEarthHS/ImageServer/WMSServer?Layers=0"  }},
    { label: "DOGAMI HighestHitHS", value: { source: 'WMS',  url: "https://gis.dogami.oregon.gov/arcgis/services/Public/HighestHitHS/ImageServer/WMSServer?Layers=0" }}
];

const oregonExplorerHydro = "https://navigator.state.or.us/ArcGIS/rest/services/Framework/Hydro_GeneralMap/MapServer";
const lakes       = oregonExplorerHydro + "/0"
const streams     = oregonExplorerHydro + "/1"
const waterbodies = oregonExplorerHydro + "/2"
const rivers      = oregonExplorerHydro + "/3"

// DOGAMI "https://gis.dogami.oregon.gov/arcgis/rest/services/Public"
const DOGAMI_Landslide = "https://gis.dogami.oregon.gov/arcgis/rest/services/Public/Landslide_Susceptibility/ImageServer"

// FEMA https://hazards.fema.gov/femaportal/wps/portal/NFHLWMS
const FEMA_NFHL_arcgisREST = "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer"

// Where the PDFs live
const taxmapsBaseUrl = "http://maps.co.clatsop.or.us/applications/taxreports/taxmap"

const taxlotsService = "https://cc-gis.clatsop.co.clatsop.or.us/arcgis/rest/services/Taxlots/FeatureServer"
const taxlotLabels   = taxlotsService + "/0";
const taxlotFeatures = taxlotsService + "/1";
const taxlotColumns = [
    {dataField: 'MapTaxlot', text: 'Map Taxlot'},
    {dataField: 'MapNumber', text: 'Map Number'//,   formatter: (url,text) => (
            //<a href="{ url }">{ text }</a>
        //)
    },
]
const taxlotTableKey   = 'MapTaxlot';
const taxlotPopupField = 'MapTaxlot';

/*
const taxlotsWFS = myGeoServer
    + "/ows?service=WFS&version=2.0.0&request=GetFeature"
    + "&typeName=" + workspace + "%3Ataxlots"
const taxlotColumns = [
    {dataField: 'account_id', text: 'Account'},
    {dataField: 'owner_line', text: 'Owner'},
    {dataField: 'situs_addr', text: 'Situs'},
    {dataField: 'situs_city', text: 'Situs City'},
    {dataField: 'mapnum',     text: 'Map Number'//,   formatter: (url,text) => (
            //<a href="{ url }">{ text }</a>
        //)
    },
]
const taxlotTableKey   = 'account_id';
const taxlotPopupField = 'situs_addr';
*/

const taxlotStyle = { // pink w black outline
    stroke: {color: [180, 50, 50, 1], width:1},
    fill:   {color: [255, 0, 0, .000]}, // no fill = not selectable
};

//const taxlotTextStyle = {
//    text: "TEXT",
//    offsetY: -10
//};

const selectedStyle = { // yellow
    stroke: {color: [255, 255, 0, 1.00], width:.15},
    fill:   {color: [255, 255, 0,  .05]},
};
const tlSt = buildStyle(taxlotStyle);
const selectedSt = buildStyle(selectedStyle);

const ScaleBar = (props) => (
    <span id="scalebar">
        Scale: { props.children }
    </span>
);

class Map46 extends React.Component {
    state = {
        aerialUrl    : aerials[0].value.url, // 1966
        aerialSource : aerials[0].value.source, // 1966
        aerialVisible: false,
        bingVisible:   false,
        enableModify: true, // can't change this in the app yet
        popupPosition: undefined, // where it will show up on screen
        popupText: 'HERE', // text to display in popup
        rows : [],
        mousePosition: '',
    };
    static propTypes = {
        title: PropTypes.string
    };

    constructor(props) {
        super(props);
        // I create the source here so I don't have to go searching around
        // for it later when I need to access its features.
        this.taxlotSource = new VectorSource({ strategy: bboxStrategy });
        //this.taxlotSource.setLoader(DataLoader('geojson', taxlotsWFS, this.taxlotSource));
        this.taxlotSource.setLoader(DataLoader('esrijson', taxlotFeatures, this.taxlotSource));
        this.selectedFeatures = new Collection();
    }

    showMousePosition = (e) => {
        const lonlat = toLonLat(e.coordinate)
        this.setState({
            mousePosition: toStringHDMS(lonlat)
        });
    }

    // IMPROVEMENT
    // https://openlayers.org/en/latest/apidoc/module-ol_interaction_Select-Select.html
    // I need to look at this code to make adding and removing features
    // in the current selection set.

    handleCondition = (e) => {
        switch(e.type) {
            case 'click':
                return true;
/*
            case 'pointermove':
            const lonlat = toLonLat(e.coordinate)
            const features = this.taxlotSource.getFeaturesAtCoordinate(e.coordinate)
            if (features.length>0) {
                const text = features[0].get(taxlotPopupField)
                if (text!=null && text.length>0) {
                    this.setState({
                        popupPosition: e.coordinate,
                        popupText: text
                    });
                    return false;
                }
            }
            this.setState({popupPosition: undefined}); // hide popup
            return false; // don't do a selection!
*/
/*
            case 'platformModifierKeyOnly':
                console.log("CTL", e);
                return false;
*/
        }
        return false; // pass event along
    }

    addFeaturesToTable(features) {
        const rows = [];
        if (features.getLength()) {
            features.forEach( (feature) => {
                const attributes = {};
                // Copy the data from each feature into a list
                //const allprops = feature.getProperties();
                taxlotColumns.forEach ( (column) => {
                    try {
                        const text = feature.get(column.dataField);
                        //const url = taxmapsBaseUrl + '/tp_' + text + '.pdf';
                        attributes[column.dataField] = text;
                        //(typeof column.formatter !== 'undefined')?
                        //    column.formatter(url,text) : text;
                    } catch {
                        console.log("No column:", column)
                    };
                });
                rows.push(attributes)
            });
        }
        this.setState({rows: rows});
    }

    onSelectInteraction = (e) => {
        console.log('onSelectInteraction', e);
        this.addFeaturesToTable(this.selectedFeatures)
    }

    onBoxStart = (e) => {
        this.selectedFeatures.clear();
    }

    onBoxEnd = (e) => {
        const extent = e.target.getGeometry().getExtent();
        this.selectedFeatures.extend(this.taxlotSource.getFeaturesInExtent(extent));
        this.addFeaturesToTable(this.selectedFeatures);
    }

    selectAerialPhoto = (e) => {
        if (e.value.url.length>0) {
            console.log('selectAerialPhoto', e);
            this.setState({
                "aerialUrl": e.value.url,
                "aerialSource": e.value.source,
                "aerialVisible": true
            });
        } else {
            this.setState({"aerialVisible": false});
        }
    }

    render() {
        const popup = React.createElement('div',
            { className:"ol-popup" },
            this.state.popupText
        );
        console.log('we go now to ', this.props.mapExtent.center);
        return (
            <>
                <Geocoder/><br />
                <Select options={ aerials } onChange={ this.selectAerialPhoto } />
                <Map
                    useDefaultControls={ false } onPointerMove={ this.showMousePosition }
                    view=<View zoom={ this.props.mapExtent.zoom }
                             center={ this.props.mapExtent.center }
                             minZoom={ 9 } maxZoom={ 19 }/>
                >
                    <layer.Tile source="OSM" />
{/*
                    <layer.Tile name="Bing Aerial"
                        source="BingMaps" imagerySet="Aerial"
                        apikey={ bingmapsKey }
                        visible={ this.state.bingVisible }
                    />
*/}
                    <layer.Image
                        source={ this.state.aerialSource }
                        url={ this.state.aerialUrl }
                        visible={ this.state.aerialVisible }
                    />

                    <layer.Vector name="Taxlots"
                        source={ this.taxlotSource }
                        style={ taxlotStyle }
                        editStyle={ selectedStyle }
                    >
                    {/*
                    <layer.Vector name="Taxlots"
                        source={ this.taxlotSource }
                        style={ taxlotStyle }
                    >
                    */}
                        <interaction.Select
                            select={ this.onSelectInteraction }
                            condition={ this.handleCondition }
                            features={ this.selectedFeatures }
                            style={ selectedSt }
                            active={ true }
                        />

                        <interaction.DragBox
                            boxstart={ this.onBoxStart }
                            boxend={ this.onBoxEnd }
                            active={ true }
                        />
                    </layer.Vector>
{/*
                    <layer.Vector name="Taxlot Labels"
                        source="esrijson"
                        url={ taxlotFeatures }
                        style={ taxlotTextStyle }
                    />
*/}
                    <Overlay id="popups"
                        element={ popup }
                        position={ this.state.popupPosition }
                        positioning="center-center"
                    />
                </Map>

                <ScaleBar>1:1234</ScaleBar>&nbsp; { this.state.mousePosition.toString() }

                <BootstrapTable bootstrap4 striped condensed
                    keyField={ taxlotTableKey }
                    columns={ taxlotColumns }
                    data={ this.state.rows }
                />
            </>
        );
    }
}

// Put the ScaleBar into the Map46 namespace.
Map46.ScaleBar = ScaleBar;

const mapStateToProps = (state) => (Object.assign({},
    state.bookmarks,
    state.mapExtent,
));
const mapDispatchToProps = {
    setMapCenter
};
export default connect(mapStateToProps, mapDispatchToProps)(Map46);
