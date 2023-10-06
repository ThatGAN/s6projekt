import React from "react";
//import ReactDOM from "react-dom";
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
import { registerLicense } from "@syncfusion/ej2-base";
import Auth from "./components/Auth/auth.js";
import store from "./store/store";
import { MapComponent } from "./components/Maps/mapComponent";

import { createRoot } from "react-dom/client";

const Routs = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<App />}></Route>
        <Route exact path="/auth" element={<Auth />} />
        {/* <Route exact path="/maps" element={<MapComponent />} /> */}
      </Routes>
    </Router>
  );
};
const root = createRoot(document.getElementById("root"));
//ToDo: Move API Key to backend
//Done: Moved to .env
registerLicense(process.env.REACT_APP_SYNCFUSION_API_KEY);
root.render(
  <Provider store={store}>
    <Routs />
  </Provider>
);
