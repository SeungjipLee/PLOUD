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
      state.recordList = [...state.recordList, action.payload.data];
    },
  },
});

export const { addRecordList } = recordSlice.actions;
export default recordSlice.reducer;