import React, { useEffect } from 'react';

import Amplify from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import Router from './routes';
import { StateProvider } from './contexts/bookReducer';
import { authHandler } from './auth';
import awsConfig from './aws-exports';
import { useDispatch } from 'react-redux';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsConfig);

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Hub.listen('auth', evt => authHandler(evt, dispatch));
  }, [dispatch]);

  return (
    <StateProvider>
      <Router />
    </StateProvider>
  );
};

export default withAuthenticator(App, true);
