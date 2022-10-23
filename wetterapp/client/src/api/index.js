import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchRecipe = (id) => API.get(`/recipes/${id}`);
export const fetchRecipes = (page) => API.get(`/recipes?page=${page}`);
export const fetchRecipesBySearch = (searchQuery) =>
  API.get(
    `/recipes/search?searchQuery=${searchQuery.search || "none"}&tags=${
      searchQuery.tags
    }`
  );
export const createRecipe = (newRecipe) => API.post("/recipes", newRecipe);
export const likeRecipe = (id) => API.patch(`${"/recipes"}/${id}/likeRecipe`);
export const updateRecipe = (id, updatedRecipe) =>
  API.patch(`${"/recipes"}/${id}`, updatedRecipe);
export const deleteRecipe = (id) => API.delete(`${"/recipes"}/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
