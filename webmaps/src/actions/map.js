import { actions } from './action-types'
import { XMIN,YMIN, XMAX,YMAX, MINZOOM,MAXZOOM } from '../constants'

// center is an array of lon,lat numbers
// zoom is a number
export function setMapCenter(center, zoom) {
    if (zoom < MINZOOM || zoom > MAXZOOM) {
        throw("Zoom outside limits");
    }
    if (center[0] < XMIN || center[0] > XMAX
     || center[1] < YMIN || center[1] > YMAX) {
        throw("Center outside bounding box")
    }
    return {
        type: actions.SETMAPCENTER,
        payload: {
            center,
            zoom
        }
    };
}

export function setDisplayPoint(lonlat, zoom) {
    if (lonlat[0] < XMIN || lonlat[0] > XMAX
     || lonlat[1] < YMIN || lonlat[1] > YMAX) {
        console.log("Point outside area of interest (warning)")
    }
    return {
        type: actions.SETDISPLAYPOINT,
        payload: {
            displayPoint: lonlat,
            displayZoom: zoom
        }
    }
}
