import { Header, Icon, Label, Segment } from 'semantic-ui-react'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import toWon from '../utils/formatCurrency'
import { useStateValue } from '../contexts/bookReducer'

export default memo(() => {
  const { push } = useHistory()
  const { pathname } = useLocation()
  const [isPathCart, setPath] = useState(false)
  const [{ account }] = useStateValue()
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
  return (
    <Segment textAlign='center' raised>
      <Header as='h1'>React Book Store</Header>
      <Label
        as={isPathCart ? 'span' : 'a'}
        color={isPathCart ? undefined : 'teal'}
        size='large'
        image
        attached='top right'
        onClick={navigateToCart}
      >
        <Icon name='user circle' />
        송조현
        <Label.Detail>
          <Icon name='cart' />
        </Label.Detail>
      </Label>
      <Label size='large' image attached='bottom right'>
        <Icon name='money' />
        <Label.Detail>{toWon(account)}</Label.Detail>
      </Label>
    </Segment>
  )
})
