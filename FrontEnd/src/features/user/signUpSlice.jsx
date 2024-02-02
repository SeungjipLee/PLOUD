import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLogined: false,
  userId: "",
  email: "",
  nickname: "", // 추가: nickname 정보를 저장할 필드 추가
  name: "",
  birthYear: "",
  password: "",
  step: 1,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    getIdPw: (state, action) => {
      state.userId = action.payload.userId
      state.password = action.payload.password
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getUserData: (state, action) => {
      state.nickname = action.payload.nickname
      state.name = action.payload.name
      state.birthYear = action.payload.birthYear
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    }
  },
});


export const { getIdPw, getEmail, getUserData, updateStep } = signUpSlice.actions;
export default signUpSlice.reducer;