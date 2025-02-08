/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => null,
  },
});
export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
