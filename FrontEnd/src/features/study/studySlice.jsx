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
      // console.log(action.payload.data);
      state.studyInfo = action.payload.data;
    },
  },
});

export const { getStudyList, getStudy } = studySlice.actions;
export default studySlice.reducer;

/* 방 임시 데이터
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
  */