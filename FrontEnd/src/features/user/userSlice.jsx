import { createSlice } from '@reduxjs/toolkit'
import {request} from "../../lib/axios"

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user_id: '',
    email: '',
    password: '',
    nickname: '',
    name: '',
    token: '',
    birth_year: '',    
  },
  reducers: {
    signup: (state, action) => {
      const USER_URL = "/api/user"
      const data = request("post", USER_URL + "/signup", action.payload)
    },
    // login: (state) => {
    // },
    // logout: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

export const { signup } = userSlice.actions

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

export default userSlice.reducer