import React, { memo, Dispatch, useCallback } from 'react';
import { Button, Card, Item } from 'semantic-ui-react';
import { TBook } from './book';
import RSwal from '../utils/reactSwal';
import { TMoneyState } from './wallet';

export type TCartProduct = TBook & {
  number: number
}

export type TCartState = [TCartProduct[], Dispatch<TCartProduct[]>];

type TCartProps = {
  moneyState: TMoneyState,
  cartState: TCartState
}

export default memo(({
  moneyState: [totalAmount, setAmount],
  cartState: [cartProducts, setCartProduct],
}: TCartProps) => (
  <Card>
    <Card.Content>
      <Card.Header>구입 목록</Card.Header>
      <Item.Group divided>
        {cartProducts.map(({ title, img, price, number }, i) => (
          <Item key={`${title}_${i}`}>
            <Item.Image size="tiny" src={img} />
            <Item.Content>
              <Item.Header>{title}</Item.Header>
              <Item.Meta>{`₩${price.toLocaleString()}`}</Item.Meta>
              <Item.Description>{`${number}개`}</Item.Description>
              <Button
                content="remove"
                icon="trash"
                labelPosition="left"
                onClick={() => {
                  const result: number = totalAmount + price;
                  const currItemIndex: number = cartProducts.findIndex(({ title: purchasedProdTitle }) => purchasedProdTitle === title);
                  const removedCartProduct: TCartProduct[] = [...cartProducts];
                  if (number > 1) {
                    removedCartProduct[currItemIndex].number -= 1;
                  } else if (number === 1 && currItemIndex > -1) {
                    removedCartProduct.splice(currItemIndex, 1);
                  }
                  setAmount(result);
                  setCartProduct(removedCartProduct);
                  RSwal.fire({
                    type: 'info',
                    title: `${title} 1개가 제거되었습니다.`
                  });
                }}
              />
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Card.Content>
  </Card>
));