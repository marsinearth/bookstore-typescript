import React, { memo, useCallback } from 'react'
import { Button, Card, Divider } from 'semantic-ui-react'
import { useStateValue } from '../contexts/bookReducer'
import toWon from '../utils/formatCurrency'

export default memo(() => {
  const [{ account }, dispatch] = useStateValue()
  return (
    <Card>
      <Card.Content>
        <Card.Header>Wallet</Card.Header>
        <Card.Meta>잔액</Card.Meta>
        <Card.Description>{toWon(account)}</Card.Description>
        <Divider />
        <Button
          content="Reset wallet"
          icon="money"
          labelPosition="left"
          onClick={useCallback(() => {
            dispatch({ type: 'reset-cart' })           
          }, [dispatch])}
        />
      </Card.Content>
    </Card>
  )
});