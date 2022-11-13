import { combineReducers } from "redux";

import entries from "./entries";
import auth from "./auth";

export default combineReducers({
  entries,
  auth,
});
