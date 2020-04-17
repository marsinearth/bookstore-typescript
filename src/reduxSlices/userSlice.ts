import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { UpdateUserMutationVariables } from '../API';
import { updateUser } from '../graphql/mutations';

export interface User {
  id: string;
  sub: string;
  name: string;
  account: number;
}

export const initialState: User = { id: '', name: '', sub: '', account: 40000 };

export const updateAccount = createAsyncThunk(
  'user/updateAccount',
  async ({ id, account }: Pick<User, 'id' | 'account'>) => {
    try {
      const updateUserVariables: UpdateUserMutationVariables = {
        input: {
          id,
          account,
        },
      };
      const { data } = (await API.graphql(
        graphqlOperation(updateUser, updateUserVariables),
      )) as GraphQLResult<{ updateUser: User }>;
      if (typeof data?.updateUser.account === 'number') {
        return data.updateUser.account;
      }
    } catch (err) {
      console.error(`error on cart/updateAccount: ${err}`);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      const { id, name, sub, account } = action.payload;
      state.id = id;
      state.name = name;
      state.sub = sub;
      state.account = account;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateAccount.fulfilled, (state, action) => {
      if (typeof action.payload === 'number') {
        state.account = action.payload;
      }
    });
  },
});

export const { logIn } = userSlice.actions;

export default userSlice.reducer;
