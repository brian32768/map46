import React from 'react'
import PropTypes from 'prop-types'
import { Converter } from 'usng/usng'
//import { usngPrecision } from '../constants'

// This component only displays a position passed in as props.
// It does not care about any position stored in redux state.

const Position = ({ coord, zoom }) => {
    const d = 10; //usngPrecision[zoom];
    let x = coord[0];
    let y = coord[1];
    if (typeof x === 'string')
        x = parseFloat(x)
    if (typeof y === 'string')
        y = parseFloat(y)
    x = x.toFixed(d)
    y = y.toFixed(d)
    const usngConverter = new Converter
    const hash = usngConverter.LLtoUSNG(y,x,d);
    return (
        <>
            { x } { y } { zoom } <br />
            { hash }
        </>
    );
}
Position.propTypes = {
    coord: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
}
export default Position;
