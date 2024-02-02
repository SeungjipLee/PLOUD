import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  studyList: [],
  studyInfo: undefined,
};

const studyrooms = [
    {
      categoryId: 1,
      currentPeople: 1,
      isPrivate: false,
      managerId: "kyd1126",
      maxPeople: 3,
      password: null,
      sessionId: "session0",
      speechId: -1,
      title: "asdfasdf",
    },
    {
      categoryId: 1,
      currentPeople: 1,
      isPrivate: false,
      managerId: "kyd1126",
      maxPeople: 3,
      password: null,
      sessionId: "session0",
      speechId: -1,
      title: "asdfasdf",
    },
    {
      categoryId: 1,
      currentPeople: 1,
      isPrivate: false,
      managerId: "kyd1126",
      maxPeople: 3,
      password: null,
      sessionId: "session0",
      speechId: -1,
      title: "asdfasdf",
    },
    {
      categoryId: 1,
      currentPeople: 1,
      isPrivate: false,
      managerId: "kyd1126",
      maxPeople: 3,
      password: null,
      sessionId: "session0",
      speechId: -1,
      title: "asdfasdf",
    },
  ];
export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    getStudyList: (state, action) => {
      state.studyList = [...studyrooms, ...action.payload];
    },
    getStudy: (state, action) => {
      state.studyInfo = action.payload.data;
    }
  },
});

export const { getStudyList, getStudy } = studySlice.actions;
export default studySlice.reducer;