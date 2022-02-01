import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../adapters/admin-adapter";

// Slice
const slice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserAction: (state, action) => action.payload,
    resetUser: (state, action) => {
      return {};
    },
    changeProfile: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});
export default slice.reducer;
// Actions
const { setUserAction, resetUser, changeProfile } = slice.actions;

/**
 * @param {Object} user - user object
 */

export const setUser = (user) => async (dispatch) => {
  try {
    dispatch(setUserAction(user));
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(resetUser());
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const getAuthorInfo = () => async (dispatch) => {
  try {
    const { status, data } = await api.getAuthorInfo();
    if (status === 200) {
      dispatch(setUserAction(data.user));
    }
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};

export const changeProfileImage = (profileImage) => async (dispatch) => {
  try {
    dispatch(changeProfile(profileImage));
  } catch (e) {
    toast.error(e?.response?.data?.message, {
      position: "bottom-center",
      closeOnClick: true,
    });
  }
};
