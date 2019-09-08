import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import appReducers from './reducers/index';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const store = createStore(
    appReducers,
    applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router><App /></Router> 
        </Provider>
, document.getElementById('root'));
serviceWorker.unregister();