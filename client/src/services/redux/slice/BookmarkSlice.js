import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const authSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});
