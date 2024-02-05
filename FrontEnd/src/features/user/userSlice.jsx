import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { request } from "../../lib/axios";

const initialState = {
  isLogined: false,
  token: { accessToken: "", refreshToken: "", tokenType: "" },
  userId: "",
  email: "",
  nickname: "", // 추가: nickname 정보를 저장할 필드 추가
  name: "",
  birth_year: "",
  loading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.isLogined = true;
      state.token = {
        accessToken: action.payload.data.accessToken,
        refreshToken: action.payload.data.refreshToken,
        tokenType: action.payload.data.tokenType
      }
      state.nickname = action.payload.data.nickname; // 추가: nickname 정보 저장
    },
    getNewToken: (state, action) => {
      state.token = action.payload.data
    },
    expireToken: (state) => {
      state.isLogined = false;
      state.token = { accessToken: "", refreshToken: "", tokenType: "" };
      state.nickname = ""; // 추가: 로그아웃 시 nickname 초기화
    },
    getUserId: (state, action) => {
      state.userId = action.payload;
    },
    updateNickname: (state, action) => {
      state.nickname = action.payload;
    }
  },
});


export const { getToken, expireToken, getUserId, getNewToken, updateNickname } = userSlice.actions;
export default userSlice.reducer;