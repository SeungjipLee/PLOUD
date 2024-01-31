import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../lib/axios";

const initialState = {
  studyList: [],
};

export const studySlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getStudyList: (state, action) => {
      state.studyList = []
      state.List.push(action.payload.data)
    },
  },
});

export const { getStudyList } = studySlice.actions;
export default studySlice.reducer;
