import { persistStore } from 'redux-persist';
import store from './store'; // 스토어 파일 경로에 맞게 수정하세요

export const persistor = persistStore(store);