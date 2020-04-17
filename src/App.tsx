import '@aws-amplify/ui/dist/style.css';

import React, { useEffect } from 'react';

import Amplify from 'aws-amplify';
import { Hub } from '@aws-amplify/core';
import Router from './routes';
import { authHandler } from './auth';
import awsConfig from './aws-exports';
import { useDispatch } from 'react-redux';
import { withAuthenticator } from 'aws-amplify-react';

Amplify.configure(awsConfig);

const AuthenticatedRouter = withAuthenticator(Router, true);

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Hub.listen('auth', evt => authHandler(evt, dispatch));
  }, [dispatch]);

  return <AuthenticatedRouter />;
};
