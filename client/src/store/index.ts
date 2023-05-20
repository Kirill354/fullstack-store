import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import userSlice from './slices/userSlice';
import deviceSlice from './slices/deviceSlice';

export const store = configureStore({
   reducer: {
      user: userSlice,
      device: deviceSlice,
   },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
