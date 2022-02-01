import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "../slices/user";
import posts from "../slices/posts";
import post from "../slices/post";
import categories, { getCategories } from "../slices/categories";
const reducer = combineReducers({
  user,
  posts,
  post,
  categories,
});

const store = configureStore({
  reducer,
  devTools: true,
});

store.dispatch(getCategories());

export default store;
