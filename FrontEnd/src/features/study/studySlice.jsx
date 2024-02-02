import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyList: [],
};

export const studySlice = createSlice({
  name: "study",
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
