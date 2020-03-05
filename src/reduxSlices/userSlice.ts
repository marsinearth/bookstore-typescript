import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type UserState = {
  name: string;
  sub: string;
  account: number;
};

type UserPayload = Pick<UserState, 'name' | 'sub'>;

const userSlice = createSlice({
  name: 'user',
  initialState: { name: '', sub: '', account: 40000 } as UserState,
  reducers: {
    logIn: (state, action: PayloadAction<UserPayload>) => {
      const { name, sub } = action.payload;
      state.name = name;
      state.sub = sub;
    },
  },
});

export const { logIn } = userSlice.actions;

export default userSlice.reducer;
