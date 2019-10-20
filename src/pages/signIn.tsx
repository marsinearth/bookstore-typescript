import { Button, Container } from 'semantic-ui-react';
import React, { memo, useCallback, useEffect } from 'react'

import { Auth } from 'aws-amplify';
import { TAuthState } from '../routes';
import { useHistory } from 'react-router-dom';

export default memo(({ authState }: Pick<TAuthState, 'authState'>) => {
  const { replace } = useHistory();
  
  useEffect(() => {
    if (authState === 'signedIn') {
      replace('/')
    }
  }, [replace, authState])

  const signIn = useCallback(() => Auth.federatedSignIn({ customProvider: 'Google' }), [])
  
  return (
    <Container textAlign='center'>
      <Button 
        icon="google" 
        content="Sign In with Google Account" 
        labelPosition="left"
        onClick={signIn}
      />
    </Container>
  )
})
