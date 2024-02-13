import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import userReducer from '../features/user/userSlice'
import signUpReducer from '../features/user/signUpSlice'
import studyReducer from '../features/study/studySlice'
import recordReducer from '../features/record/recordSlice'

const reducers = combineReducers({
  // 여기에 리듀서 추가
  userReducer,
  signUpReducer,
  studyReducer,
  recordReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  // 여기에 저장하고 싶은 리듀서 이름 추가
  whitelist: ['userReducer', 'signUpReducer', 'studyReducer', 'recordReducer'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  // 직렬화 가능하지 않은 객체가 들어와도 오류가 나지 않게 변경
  // 직렬화 가능하지 않은 객체 : Promise, 함수, 기타 등등
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});