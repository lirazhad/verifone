/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Provider} from 'react-redux';
import {name as appName} from './app.json';
import store from './src/services/store';
// import {persistor} from './src/services/store'
import './i18n';
import {PersistGate} from 'redux-persist/integration/react';

const Root = () => (
    <Provider store={store}>
        {/*<PersistGate loading={null} persistor={persistor}>*/}
            <App />
        {/*</PersistGate>*/}
    </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
