import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recordList: [],
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    addRecordList: (state, action) => {
      console.log(action.payload);
      state.recordList = [...state.recordList, action.payload];
    },
    initRecordList: (state, action) => {
      state.recordList = [];
    },
  },
});

export const { addRecordList, initRecordList } = recordSlice.actions;
export default recordSlice.reducer;