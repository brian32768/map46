import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import configStore, { history } from './configstore'
import { TickTock } from './components'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

// Bug in parcel? This should allow async to work.
//import 'babel-polyfill'

const { store, persistor } = configStore();

/*
console.log("index.js=", process.env.SAMPLE_PASSWORD);
<PersistGate loading={<TickTock/>} persistor={persistor}>
</PersistGate>
*/

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("app")
);
