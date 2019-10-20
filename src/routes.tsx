import { Auth, Hub } from 'aws-amplify';
import React, { FC, memo, useEffect, useReducer } from 'react'
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import BookDetail from './pages/bookDetail'
import BookShelf from './pages/bookShelf'
import Cart from './pages/cart'
import { Container } from 'semantic-ui-react'
import HeadPart from './components/headPart'
import SignIn from './pages/signIn'

export type TAuthState = {
  authState: string;
  authData?: any;
  authError?: any;
}

export type TAuthAction = {
  type: 'signIn' | 'signOut';
  data?: any
}

type TPrivateRouteProps = {
  component: FC<any>;
  authState: string;
  [s: string]: any;
}

const initialState = {
  authState: 'loading',
  authData: null,
  authError: null
}

const reducer = (state: TAuthState, action: TAuthAction) => {
  switch (action.type) {
    case 'signIn':
      return {
        ...state, 
        authState: 'signedIn', 
        authData: action.data
      }
    case 'signOut':
      return {
        ...state,
        authState: 'signIn',
        authData: null,
        authError: action.data
      }
    default:
      return state
  }
}

const PrivateRoute: FC<TPrivateRouteProps> = ({ component: Component, authState, ...rest }) => (
  <Route
    {...rest}
    render={(props: any) =>
      authState === 'signedIn' ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/signIn',
            state: { from: props.location }
          }}
        />
      )
    }
  />
)

export default memo(() => {
  const [{ authState }, dispatch] = useReducer(reducer, initialState);

  Hub.listen('auth', ({ payload: { data }}) => {
    switch(data.payload.event) {
      case 'signIn':
        dispatch({ type: 'signIn', data });
        break;
      case 'signIn_failure':
        dispatch({ type: 'signOut', data });
        break;
      default:
        break;
    }
  })

  useEffect(() => { // componentDidMount 역할
    Auth.currentAuthenticatedUser().then(user => {
      console.log({ user })
      dispatch({ type: 'signIn' })
    }).catch(e => {
      console.log({ e })
      dispatch({ type: 'signOut' })
    })
  }, [])
  
  return (
    <Router>
      <Container fluid>
        <HeadPart visible={authState === 'signedIn'} dispatch={dispatch} />
        <Switch>
          <PrivateRoute exact path='/' component={BookShelf} authState={authState} />
          <Route path='/signIn' render={(props) => <SignIn {...props} authState={authState} />} />          
          <PrivateRoute path='/detail/:isbn' component={BookDetail} authState={authState} />
          <PrivateRoute path='/cart' component={Cart} authState={authState} />
        </Switch>
      </Container>
    </Router>
  )
})
