import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducers from "./reducers";

import App from "./App";
import withTheme from "./HOC/withTheme";

import * as serviceWorker from "./serviceWorker";

import { loadState, saveState } from "../../src";

const preloadedState = loadState();
const store = createStore(reducers, preloadedState);
saveState({ store, timer: 1000 });

const ThemedApp = withTheme(App);
ReactDOM.render(
  <Provider {...{ store }}>
    <ThemedApp />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
