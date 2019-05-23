import { createStore, applyMiddleware, compose } from 'redux'
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducers'
import { loggerMiddleware, errorMiddleware } from './middleware'
const history = createBrowserHistory();

// This object defines where the storage takes place,
// in this case, it's in local storage in your browser.
const persistConfig = {
    key: "root",
    storage,
}

const enhancedCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer)

// I think the routerMiddleware thing is what makes
// the standard history thing work.
// I probably need to implement my own middleware for OL

export default () => {
    let store = createStore(
        connectRouter(history)(pReducer),
        enhancedCompose(
            applyMiddleware(
                routerMiddleware(history),
                loggerMiddleware,
                errorMiddleware
            )
        )
    );
    let persistor = persistStore(store)
    return { store, persistor }
}
