import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import "./index.css";
import App from "./App.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./components/AUTH/Auth.js";

import reducers from "./reducers";
import { createRoot } from "react-dom/client";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.register();

const Routs = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />}></Route>
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};
const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Routs />
  </Provider>
);
