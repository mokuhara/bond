import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../pages/auth/authSlice';
import mypageReducer from '../pages/mypage/mypageSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mypage: mypageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
