import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../adapters/admin-adapter";
import publicApi from "../../adapters/adapter";
import { toast } from "react-toastify";

export const getPosts = createAsyncThunk("posts/get", async () => {
  try {
    const { status, data } = await api.getPosts();
    if (status === 200) {
      return data.posts;
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
});

export const getPostsByAuthor = createAsyncThunk(
  "posts/getByAuthor",
  async (authorId) => {
    try {
      const { status, data } = await api.getPostsByAuthor(authorId);
      if (status === 200) {
        return data.posts;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const getPostsByCategory = createAsyncThunk(
  "posts/getByCategory",
  async (category) => {
    try {
      const { status, data } = await api.getPostsByCategory(category);
      if (status === 200) {
        return data.posts;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const getPostsByTag = createAsyncThunk(
  "posts/getByTag",
  async ({ tag, page }) => {
    try {
      const { status, data } = await publicApi.getPostsByTag(tag, page);
      if (status === 200) {
        return data.posts;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const createNewPost = createAsyncThunk(
  "posts/createPost",
  async (formData) => {
    try {
      const { status, data } = await api.createPost(formData);
      if (status === 201) {
        toast.success("ذخیره شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        return data.post;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, formData }) => {
    try {
      const { status, data } = await api.editPost(id, formData);
      if (status === 200) {
        toast.success("پست با موفقیت ویرایش شد", {
          position: "bottom-center",
          closeOnClick: true,
        });
        return data.post;
      }
    } catch (e) {
      toast.error(e?.response?.data?.message, {
        position: "bottom-center",
        closeOnClick: true,
      });
    }
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (id) => {
  try {
    const { status, data } = await api.deletePost(id);
    if (status === 200) {
      toast.success("پست با موفقیت حذف شد", {
        position: "bottom-center",
        closeOnClick: true,
      });
      return id;
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
});

// Slice
const slice = createSlice({
  name: "posts",
  initialState: { status: "idle", entity: [] },
  reducers: {},
  extraReducers: {
    [getPosts.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPosts.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsByAuthor.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPostsByAuthor.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsByCategory.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPostsByCategory.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsByTag.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPostsByTag.pending]: (state) => {
      state.status = "loading";
    },
    [createNewPost.fulfilled]: (state, action) => {
      // state.entity.push(action.payload);
      state.status = "idle";
    },
    [createNewPost.pending]: (state) => {
      state.status = "loading";
    },
    [editPost.fulfilled]: (state, action) => {
      let postIndex = state?.entity?.findIndex(
        (p) => p?._id === action.payload?._id
      );
      state.entity[postIndex] = action.payload;
      state.status = "idle";
    },
    [editPost.pending]: (state) => {
      state.status = "loading";
    },
    [deletePost.fulfilled]: (state, action) => {
      state.entity = state.entity.filter((p) => p._id !== action.payload);
      state.status = "idle";
    },
    [deletePost.pending]: (state) => {
      state.status = "loading";
    },
  },
});
export default slice.reducer;
