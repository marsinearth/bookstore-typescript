import API, { graphqlOperation } from '@aws-amplify/api';
import { CreateUserMutationVariables, ListUsersQueryVariables } from '../API';

import { Dispatch } from 'redux';
import { createUser } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';
import { logIn } from '../reduxSlices/userSlice';

interface AuthParams {
  name: string;
  sub: string;
}

const saveUser = async ({ sub, name }: AuthParams) => {
  try {
    console.log(`${name} signed up! `, { sub });
    localStorage.setItem('signedUpUserSub', sub);
  } catch (err) {
    console.error('error on saveUser: ', err);
  }
};

const findUser = async (dispatch: Dispatch, { sub, name }: AuthParams) => {
  try {
    const userSub = localStorage.getItem('signedUpUserSub');
    if (userSub === sub) {
      const createUserVariables: CreateUserMutationVariables = {
        input: { name, sub, account: 40000 },
      };
      const { data } = await API.graphql(
        graphqlOperation(createUser, createUserVariables),
      );
      console.log(`${name} created user: `, { data });
      localStorage.removeItem('signedUpUserSub');
    } else {
      const listUsersVariables: ListUsersQueryVariables = {
        filter: { sub: { eq: sub } },
      };
      const { data } = await await API.graphql(
        graphqlOperation(listUsers, listUsersVariables),
      );
      console.log(`${name} found user: `, { data });
    }
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
