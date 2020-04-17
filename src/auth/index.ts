import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import { CreateUserMutationVariables, ListUsersQueryVariables } from '../API';
import { User, logIn } from '../reduxSlices/userSlice';

import { Dispatch } from 'redux';
import { createUser } from '../graphql/mutations';
import { listUsers } from '../graphql/queries';

interface AuthParams {
  name: string;
  sub: string;
}

const saveUser = async ({ sub, name }: AuthParams) => {
  try {
    console.log(`${name} signed up! `, { sub });
    // AWS Cognito User 계정 만든 후 sub을 localStorage에 저장
    localStorage.setItem('signedUpUserSub', sub);
  } catch (err) {
    console.error('error on saveUser: ', err);
  }
};

const findUser = async (dispatch: Dispatch, { sub, name }: AuthParams) => {
  try {
    // 계정 만들었을 때 localStorage에 저장했던 AWS Cognito User 의 sub을 꺼내서 방금 Sign In한 계정의 sub가 비교
    // 동일할 때는 방금 만든 계정이므로 AWS AppSync User Model에도 생성한다.
    // 동일하지 않는 경우는 이미 있는 계정으로 짐작해서 Sign in한 계정의 sub으로 AWS AppSync listUsers query로 해당 계정을 찾는다.
    let id = '';
    let account = 40000;
    const userSub = localStorage.getItem('signedUpUserSub');
    if (userSub === sub) {
      const createUserVariables: CreateUserMutationVariables = {
        input: { name, sub, account: 40000 },
      };
      const { data } = (await API.graphql(
        graphqlOperation(createUser, createUserVariables),
      )) as GraphQLResult<{ createUser: User }>;
      console.log(`${name} created user: `, { data });
      // AWS AppSync User 계정 생성 후 localStorage의 sub을 삭제한다.
      localStorage.removeItem('signedUpUserSub');
    } else {
      const listUsersVariables: ListUsersQueryVariables = {
        filter: { sub: { eq: sub } },
      };
      const { data } = (await API.graphql(
        graphqlOperation(listUsers, listUsersVariables),
      )) as GraphQLResult<{
        listUsers: {
          items: User[];
        };
      }>;
      if (data?.listUsers.items) {
        [{ id, account }] = data?.listUsers.items;
        console.log(`${name} found user: `, { data: data?.listUsers.items[0] });
      }
    }
    dispatch(logIn({ id, name, sub, account }));
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
