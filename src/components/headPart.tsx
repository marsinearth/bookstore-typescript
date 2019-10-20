import { Header, Icon, Label, Segment } from 'semantic-ui-react'
import React, { Dispatch, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Auth } from 'aws-amplify';
import { TAuthAction } from '../routes';
import toWon from '../utils/formatCurrency'
import { useStateValue } from '../contexts/bookReducer'

type THeadPartProps = {
  visible: boolean;
  dispatch: Dispatch<TAuthAction>;
}

export default memo<THeadPartProps>(({ visible, dispatch }) => {
  const { push } = useHistory()
  const { pathname } = useLocation()
  const [isPathCart, setPath] = useState(false)
  const [{ account, cartProducts }] = useStateValue()

  const productNum = useMemo(() => {
    return cartProducts.reduce((acc, { number }) => (
      acc += number
    ), 0);
  }, [cartProducts]);

  useEffect(() => {
    if (pathname === '/cart') {
      setPath(true)
    } else {
      setPath(false)
    }
  }, [pathname])

  const navigateToCart = useCallback(() => {
    if (!isPathCart) {
      push('/cart')
    }
  }, [push, isPathCart])

  const signOut = useCallback(() => {
    Auth.signOut().then(() => {
      dispatch({ type: 'signOut' })
    }).catch((e: any) => {
      console.log({ e })
    })
  }, [dispatch])
  
  return (
    <Segment textAlign='center' raised>
      <Header as='h1'>React Book Store</Header>      
      <Label size='large' image attached='top right'>
        <Icon name='money' />
        <Label.Detail>{toWon(account)}</Label.Detail>
      </Label>
      {visible && (
        <Label
          as="span"
          compact 
          size="small"
          // color="teal"
          attached="bottom right"
        >
          <Label
            as="span"
            color='teal'
            compact
          >
            <Icon name='user circle' />
            송조현
          </Label>    
          <Label
            as={isPathCart ? 'span' : 'a'}
            color={isPathCart ? undefined : 'teal'}
            onClick={navigateToCart}
          >
            <Icon name='cart' />
            {!!productNum && (
              <Label.Detail
                as="span"
                floating
                circular
                compact
                content={productNum}
              />
            )}
          </Label>          
          <Label
            as="a"
            color="red"
            onClick={signOut}
          >
            <Icon name='sign-out' />
          </Label>
        </Label>
      )}       
    </Segment>
  )
})
