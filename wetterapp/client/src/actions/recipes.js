import {
  START_LOADING,
  END_LOADING,
  FETCH_ALL,
  FETCH_RECIPE,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getRecipe = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });

    const { data } = await api.fetchRecipe(id);

    dispatch({ type: FETCH_RECIPE, payload: { recipe: data } });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipes = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data, currentPage, numberOfPages },
    } = await api.fetchRecipes(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getRecipesBySearch = (searchQuery) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const {
      data: { data },
    } = await api.fetchRecipesBySearch(searchQuery);

    dispatch({ type: FETCH_BY_SEARCH, payload: { data } });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createRecipe = (recipe, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createRecipe(recipe);

    dispatch({ type: CREATE, payload: data });

    // navigate(`/rezepte/${data._id}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateRecipe = (id, recipe) => async (dispatch) => {
  try {
    const { data } = await api.updateRecipe(id, recipe);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeRecipe = (id) => async (dispatch) => {
  try {
    console.log("data: ", id);
    const { data } = await api.likeRecipe(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await api.deleteRecipe(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};
