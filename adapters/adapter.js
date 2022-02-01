import http from "./xhr";
import config from "./xhr/config.json";

const signup = (user) => {
  return http.post(`${config.api}/signup`, JSON.stringify(user));
};

const login = (user) => {
  return http.post(`${config.api}/login`, JSON.stringify(user));
};

const verify = (verificationCode) => {
  return http.post(
    `${config.api}/verifiy-account`,
    JSON.stringify(verificationCode)
  );
};

const changePassword = (data) => {
  return http.post(`${config.api}/change-password`, JSON.stringify(data));
};

const forgetPassword = (data) => {
  return http.post(`${config.api}/forget-password`, JSON.stringify(data));
};

const resendCode = (userId) => {
  return http.post(`${config.api}/resend-code`, JSON.stringify(userId));
};

const changeProfileImage = (data) => {
  return http.post(`${config.api}/change-profile-image`, data);
};

const getPosts = (page = 0) => {
  return http.get(`${config.api}/posts`, { params: { page } });
};

const getPostsByAuthor = (author) => {
  return http.get(`${config.api}/posts/author/${author}`);
};

const getPostsByCategory = (category, page) => {
  return http.get(`${config.api}/posts/category/${category}`, {
    params: { page },
  });
};

const getPostsByTag = (tag, page) => {
  return http.get(`${config.api}/posts/tag/${tag}`, {
    params: { page },
  });
};

const getPostsLength = () => {
  return http.get(`${config.api}/length`);
};

const getPost = (id) => {
  return http.get(`${config.api}/post/${id}`);
};

const likeDislikePost = (id) => {
  return http.put(`${config.api}/post/like-dislike/${id}`);
};

const getCategories = () => {
  return http.get(`${config.api}/posts/categories`);
};

const updatePostView = (id) => {
  return http.put(`${config.api}/post/${id}`);
};

const checkPostLike = (id) => {
  return http.get(`${config.api}/post/isLiked/${id}`);
};

export default {
  signup,
  login,
  verify,
  changePassword,
  forgetPassword,
  resendCode,
  getPosts,
  getPostsByCategory,
  getPostsByTag,
  getPostsLength,
  getPost,
  changeProfileImage,
  getCategories,
  likeDislikePost,
  updatePostView,
  checkPostLike,
};
