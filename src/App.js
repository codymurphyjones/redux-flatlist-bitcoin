import React from 'react'
import { registerRootComponent } from 'expo';
import { Provider } from "react-redux";

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import reducer from "State/store";
import sagas from "./state/sagas"
import Home from "./screens"

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(sagas)
const App = () => <Provider store={store}>
    <Home />
</Provider>;


console.reportErrorsAsExceptions = false;
registerRootComponent(App);


