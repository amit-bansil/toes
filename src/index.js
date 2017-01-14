// @flow

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css";
import gameReducer from "./game-reducers";

import {createStore, Provider} from "redux";
const store = createStore(gameReducer);
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root"),
);
