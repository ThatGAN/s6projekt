import { FETCH_ALL } from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getEntries = () => async (dispatch) => {
  try {
    const { data } = await api.fetchEntries();

    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error);
  }
};
