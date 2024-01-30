import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../lib/axios";

const initialState = {
  isLogined: false,
  token: { accessToken: "", refreshToken: "", tokenType: "" },
  user_id: "",
  email: "",
  nickname: "",
  name: "",
  birth_year: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getToken: (state, action) => {
      state.isLogined = true;
      state.token = action.payload.data
    },
    expireToken: (state) => {
      state.isLogined = false;
      state.token = { accessToken: "", refreshToken: "", tokenType: "" }
    },
    getUserId: (state, action) => {
      state.user_id = action.payload
    }
  },
});

export const { getToken, expireToken, getUserId } = userSlice.actions;
export default userSlice.reducer;
// // The function below is called a thunk and allows us to perform async logic. It
// // can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// // will call the thunk with the `dispatch` function as the first argument. Async
// // code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.counter.value
