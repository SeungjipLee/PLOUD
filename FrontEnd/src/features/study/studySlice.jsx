import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyList: [],
};

export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    getStudyList: (state, action) => {
      state.studyList = action.payload;
    },
  },
});

export const { getStudyList } = studySlice.actions;
export default studySlice.reducer;
