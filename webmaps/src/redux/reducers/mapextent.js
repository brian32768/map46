import { actions } from '../actions'

const starting_location = [0,0];
const starting_zoom = 7;

const initialState = {
    mapExtent: {
        center: starting_location,
        zoom: starting_zoom
    }
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_MAP_CENTER:
            const newstate = {
                mapExtent: {
                    center: action.payload.center,
                    zoom: action.payload.zoom,
                }
            };
            console.log("MapCenter state changed from ",state, ' to', newstate);
            return newstate;
    }
    return state;
}

export default reducer
