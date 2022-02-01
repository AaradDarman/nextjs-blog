import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../adapters/adapter";
import { toast } from "react-toastify";

export const getCategories = createAsyncThunk("categories/get", async () => {
  try {
    const { status, data } = await api.getCategories();
    if (status === 200) {
      return data.categories;
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
  name: "categories",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getCategories.fulfilled]: (state, action) => (state = action.payload),
  },
});
export default slice.reducer;
