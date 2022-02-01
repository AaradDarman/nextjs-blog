import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../adapters/adapter";
import { toast } from "react-toastify";

export const getPost = createAsyncThunk("post/get", async (id) => {
  try {
    const res = await api.getPost(id);
    return res.data.post;
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
});

// Slice
const slice = createSlice({
  name: "post",
  initialState: {
    status: "idle",
    entity: {},
  },
  reducers: {
    resetPost: (state, action) => {
      state.entity = {};
    },
    toggleLike: (state, action) => {
      if (state?.entity?.liked) {
        state.entity.liked = !state.entity.liked;
        state.entity.likes = action.payload;
      } else {
        state.entity.liked = true;
        state.entity.likes = action.payload;
      }
    },
  },
  extraReducers: {
    [getPost.fulfilled]: (state, action) => {
      state.entity = action.payload;
      state.status = "idle";
    },
    [getPost.pending]: (state) => {
      state.status = "loading";
    },
  },
});
export default slice.reducer;
// Actions
const { resetPost, toggleLike } = slice.actions;

export const clearPost = () => async (dispatch) => {
  try {
    dispatch(resetPost());
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const handleLikeDislike = (id) => async (dispatch) => {
  try {
    const { status, data } = await api.likeDislikePost(id);
    if (status === 200) {
      dispatch(toggleLike(data.likes));
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};
