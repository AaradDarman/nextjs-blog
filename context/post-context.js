import { createContext, useContext } from "react";

export const postContext = createContext({
  postTitle: {},
  setPostTitle: () => {},
  postSubtitle: {},
  setPostSubtitle: () => {},
  bannerImage: "",
  setBannerImage: () => {},
  contentImages: [],
  setContentImages: () => {},
  content: {},
  setContent: () => {},
  categories: {},
  setCategories: () => {},
  tags: {},
  setTags: () => {},
  handleCreatePost: () => {},
  handleEditPost: () => {},
  handleDeletePost: () => {},
  setShowPostPreviewDialog: () => {},
});

export const useCreatePost = () => {
  return useContext(postContext);
};
