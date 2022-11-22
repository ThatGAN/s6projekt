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
import Auth from "./components/AUTH/Auth.js";
import store from "./store/store";

import reducers from "./reducers";
import { createRoot } from "react-dom/client";

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
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhjQlFaclhJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRd0VhX39WdHdXTmNUUEA="
);
root.render(
  <Provider store={store}>
    <Routs />
  </Provider>
);
