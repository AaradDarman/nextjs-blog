import http from "./xhr";
import config from "./xhr/config.json";

const createPost = (post) => {
  return http.post(`${config.api}/post/create`, post);
};

const editPost = (id, data) => {
  return http.put(`${config.api}/post/edit/${id}`, data);
};

const deletePost = (id) => {
  return http.delete(`${config.api}/post/delete/${id}`);
};

const getPosts = () => {
  return http.get(`${config.api}/posts`);
};

const getPostsByAuthor = (author) => {
  return http.get(`${config.api}/posts/author/${author}`);
};

const getPostsByCategory = (category) => {
  return http.get(`${config.api}/posts/category/${category}`);
};

const getPostsByTag = (tag) => {
  return http.get(`${config.api}/posts/tag/${tag}`);
};

const getAuthorInfo = () => {
  return http.get(`${config.api}/get-author-info`);
};

export default {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getPostsByAuthor,
  getPostsByCategory,
  getPostsByTag,
  getAuthorInfo,
};
