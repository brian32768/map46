import { actions } from '../actions'
import { toLonLat, fromLonLat } from 'ol/proj'

const starting_location = [-123,46];
const starting_zoom = 7;

const initialState = {
    center: starting_location,
    zoom: starting_zoom
}

export const map = (state=initialState, action) => {
    switch(action.type) {
        case actions.SETMAPCENTER:
            const newState = {
                ...state,
                ...action.payload
            };
            console.log("map reducer:", action.type, state, " =>", newState);
            return newState;
    }
    return state;
}
