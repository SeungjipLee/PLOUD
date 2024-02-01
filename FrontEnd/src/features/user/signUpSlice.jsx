import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLogined: false,
  userId: "",
  email: "",
  nickname: "", // 추가: nickname 정보를 저장할 필드 추가
  name: "",
  birthYear: "",
  password:"",
  step: 1,
};

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    getIdPw: (state, action) => {
      state.user_id = action.payload.user_id
      state.password = action.payload.password
    },
    getEmail: (state, action) => {
      state.email = action.payload
    },
    getUserData: (state, action) => {
      state.name = action.payload.name
      state.nickname = action.payload.nickname
      state.birth_year = action.payload.birth_year
    },
    updateStep: (state, action) => {
      state.step = action.payload;
    }
  },
});


export const { getIdPw, getEmail, getUserData, updateStep } = signUpSlice.actions;
export default signUpSlice.reducer;