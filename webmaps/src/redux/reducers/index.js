import { combineReducers } from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension'
import bookmarks from './bookmarks'
import mapExtent  from './mapextent'

export default combineReducers({
    bookmarks,
    mapExtent,
    //devToolsEnhancer({ trace: true, traceLimit: 25 })
});
