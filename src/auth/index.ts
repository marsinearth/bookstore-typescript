import { DataStore } from '@aws-amplify/datastore';
import { Dispatch } from 'redux';
import { User } from '../models';
import { logIn } from '../reduxSlices/userSlice';

interface AuthParams {
  name: string;
  sub: string;
}

const saveUser = async ({ sub, name }: AuthParams) => {
  try {
    const user = await DataStore.save(
      new User({
        name,
        sub,
      }),
    );
    console.log(`${name} signed up! `, { user });
  } catch (err) {
    console.error('error on saveUser: ', err);
  }
};

const findUser = async (dispatch: Dispatch, { sub, name }: AuthParams) => {
  try {
    const user = await DataStore.query(User, u => u.sub('eq', sub));
    console.log(`${name} signed in: `, { user });
    dispatch(logIn({ name, sub }));
  } catch (err) {
    console.error('error on findUser: ', err);
  }
};

export const authHandler = (
  { payload: { event, data } }: any,
  dispatch: Dispatch,
) => {
  switch (event) {
    case 'signIn': {
      const {
        attributes: { sub },
        username: name,
      } = data;
      console.log('signIn', { data });
      findUser(dispatch, { name, sub });
      break;
    }
    case 'signUp': {
      const {
        user: { username: name },
        userSub: sub,
      } = data;
      saveUser({ name, sub });
      break;
    }
  }
};
