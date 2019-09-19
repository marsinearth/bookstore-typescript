import { Header, Icon, Label, Segment } from 'semantic-ui-react'
import React, { memo } from 'react'

import { Link } from 'react-router-dom'
import toWon from '../utils/formatCurrency'
import { useStateValue } from '../contexts/bookReducer'

export default memo(() => {
  const [{ account }] = useStateValue()
  return (
    <Segment textAlign='center' raised>
      <Header as='h1'>React Book Store</Header>
      <Link to='/cart'>
        <Label color='teal' size='large' image attached='top right'>
          <Icon name='user circle' />
          송조현
          <Label.Detail>
            <Icon name='cart' />
          </Label.Detail>
        </Label>
      </Link>
      <Label size='large' image attached='bottom right'>
        <Icon name='money' />
        <Label.Detail>{toWon(account)}</Label.Detail>
      </Label>
    </Segment>
  )
})
