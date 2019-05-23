import { actions } from '../actions'

const initialState = {
    mapExtent: {
        center: [0,0],
        zoom: 0
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
            console.log("State changed from ",state, ' to', newstate);
            return newstate;
    }
    return state;
}

export default reducer
