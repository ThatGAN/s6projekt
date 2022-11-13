import { FETCH_ALL } from "../constants/actionsTypes.js";

export default (entries: [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload.data;
    default:
      break;
  }
};
