import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyList: [],
  studyInfo: undefined,
};

export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    getStudyList: (state, action) => {
      state.studyList = [...action.payload];
    },
    getStudy: (state, action) => {
      state.studyInfo = action.payload.data;
    },
  },
});

export const { getStudyList, getStudy } = studySlice.actions;
export default studySlice.reducer;