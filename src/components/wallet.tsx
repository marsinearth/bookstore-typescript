import React, { memo, useCallback } from 'react';
import { Button, Card, Divider } from 'semantic-ui-react';
import RSwal from '../utils/reactSwal';
import { useStateValue } from '../context/bookContext';
import toWon from '../utils/formatCurrency';

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
            RSwal('success', '카트가 초기화 되었습니다!')
          }, [dispatch])}
        />
      </Card.Content>
    </Card>
  )
});