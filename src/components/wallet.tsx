import React, { memo, useState, useEffect, useCallback, Dispatch } from 'react';
import { Button, Card, Divider } from 'semantic-ui-react';
import { TCartState } from './cart';

export const initialFinance: number = 40000;

export type TMoneyState = [number, Dispatch<number>];

type TWalletProps = {
  moneyState: TMoneyState,
  cartState: TCartState
};

export default memo(({
  moneyState: [totalAmount, setAmount],
  cartState: [, setCartProduct]
}: TWalletProps) => (
  <Card>
    <Card.Content>
      <Card.Header>Wallet</Card.Header>
      <Card.Meta>잔액</Card.Meta>
      <Card.Description>{`₩${totalAmount.toLocaleString()}`}</Card.Description>
      <Divider />
      <Button
        content="Reset wallet"
        icon="money"
        labelPosition="left"
        onClick={useCallback(() => {
          setAmount(initialFinance);
          setCartProduct([]);
        }, [])}
      />
    </Card.Content>
  </Card>
));