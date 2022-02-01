import React, { useState } from "react";

import { useDispatch } from "react-redux";

import DeletePostDialog from "../components/Dashboard/dialogs/DeletePostDialog";
import PostPreviewDialog from "../components/Dashboard/dialogs/PostPreviewDialog";
import { createNewPost, editPost } from "../redux/slices/posts";
import { postContext } from "./post-context";

const PostContext = ({ children }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postSubtitle, setPostSubtitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [contentImages, setContentImages] = useState([]);
  const [content, setContent] = useState({});
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showPostPreviewDialog, setShowPostPreviewDialog] = useState(false);
  const [targetPostId, setTargetPostId] = useState("");

  const dispatch = useDispatch();

  const handleCreatePost = () => {
    let formData = new FormData();
    let contentImagesFiles = contentImages.map((c) => c.file);
    for (let i = 0; i < contentImagesFiles.length; i++) {
      formData.append(contentImagesFiles[i].name, contentImagesFiles[i]);
    }
    formData.append("post-banner", bannerImage);
    formData.append(
      "post",
      JSON.stringify({
        title: postTitle,
        subtitle: postSubtitle,
        content,
        categories: categories?.map((cat) => cat?.value),
        tags: tags.map((tag) => tag?.text),
      })
    );
    dispatch(createNewPost(formData));
  };

  const handleEditPost = (id) => {
    let formData = new FormData();
    let contentImagesFiles = contentImages.map((c) => c.file);
    if (contentImagesFiles.length) {
      for (let i = 0; i < contentImagesFiles.length; i++) {
        formData.append(contentImagesFiles[i].name, contentImagesFiles[i]);
      }
    }
    formData.append("postBanner", bannerImage);
    formData.append(
      "post",
      JSON.stringify({
        title: postTitle,
        subtitle: postSubtitle,
        content,
        categories: categories?.map((cat) => cat?.value),
        tags: tags.map((tag) => tag?.text),
      })
    );
    dispatch(editPost({ id, formData }));
  };

  const handleDeletePost = (id) => {
    setShowDeleteDialog(true);
    setTargetPostId(id);
  };

  return (
    <postContext.Provider
      value={{
        postTitle,
        setPostTitle,
        postSubtitle,
        setPostSubtitle,
        bannerImage,
        setBannerImage,
        contentImages,
        setContentImages,
        content,
        setContent,
        categories,
        setCategories,
        tags,
        setTags,
        handleCreatePost,
        handleEditPost,
        handleDeletePost,
        setShowPostPreviewDialog,
      }}
    >
      <DeletePostDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        postId={targetPostId}
      />
      <PostPreviewDialog
        isOpen={showPostPreviewDialog}
        onClose={() => setShowPostPreviewDialog(false)}
      />
      {children}
    </postContext.Provider>
  );
};

export default PostContext;
