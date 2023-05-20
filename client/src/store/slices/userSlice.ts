import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserSliceState {
   isAuth: boolean;
   user: any;
}

const initialState: UserSliceState = {
   isAuth: false,
   user: null,
};

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setAuth: (state, action: PayloadAction<boolean>) => {
         state.isAuth = action.payload;
      },
      setUser: (state, action: PayloadAction<any>) => {
         state.user = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setAuth, setUser } = userSlice.actions;

export default userSlice.reducer;
