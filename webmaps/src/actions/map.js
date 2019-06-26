import { actions } from './action-types'

export function setMapCenter( center, zoom ) {
    // center should always be in [lon,lat] format
    console.log("actions.setMapCenter", center, zoom);
    return {
        type: actions.SETMAPCENTER,
        payload: { center, zoom }
    };
}
