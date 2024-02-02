import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { request } from "../../lib/axios";

const initialState = {
  isLogined: false,
  token: { accessToken: "", refreshToken: "", tokenType: "" },
  user_id: "",
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
      console.log(token)
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
      state.user_id = action.payload;
    },
    updateNickname: (state, action) => {
      state.nickname = action.payload;
    }
  },
});


export const { getToken, expireToken, getUserId, getNewToken, updateNickname } = userSlice.actions;
export default userSlice.reducer;


  // extraReducers: (builder) => {
  //   builder
  //     .addCase(refreshAccessToken.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(refreshAccessToken.fulfilled, (state) => {
  //       state.loading = false;
  //     })
  //     .addCase(refreshAccessToken.rejected, (state) => {
  //       state.loading = false;
  //     });
  // }

// export const refreshAccessToken = createAsyncThunk(
//   'user/refreshAccessToken',
//   async (_, { getState, dispatch }) => {
//     const { refreshToken } = getState().userReducer.token;
//     if (refreshToken) {
//       try {
//         const response = await request(
//           'GET', '/api/auth/reissue',
//           { headers: {Authorization: `Bearer ${refreshToken}`}, withCredentials: true  }
//           );
//         if (response.status === 200) {
//           const { accessToken, refreshToken, tokenType } = response.data.data; 
//           dispatch(getNewToken({ accessToken, refreshToken, tokenType }));
//         }
//       } catch (e) {
//         console.error(e);
//         dispatch(expireToken());
//       }
//     }
//   }
// );