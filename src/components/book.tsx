import React, { useState, useEffect, useCallback, memo, Dispatch } from 'react';
import { Button, Card, Divider, Image } from 'semantic-ui-react';
import { TMoneyState } from './wallet';
import { TCartProduct, TCartState } from './cart';
import RSwal from '../utils/reactSwal';

export type TBook = {
  title: string,
  price: number,
  img: string
}

type TBookProps = TBook & {
  moneyState: TMoneyState,
  cartState: TCartState
};

export default memo(({
  title,
  img,
  price,
  moneyState: [totalAmount, setAmount],
  cartState: [cartProducts, setCartProduct]
}: TBookProps) => (
  <Card>
    <Image
      src={img}
      alt={title}
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>{title}</Card.Header>
      <Card.Meta>{`₩${price.toLocaleString('ko')}`}</Card.Meta>
      <Divider />
      <Button
        content="Purchase"
        icon="cart plus"
        labelPosition="left"
        onClick={() => {
          const result: number = totalAmount - price;
          if (result >= 0) {
            const purchasedIndex: number = cartProducts.findIndex(({ title: purchasedProdTitle }) => purchasedProdTitle === title);
            const purchasedProducts: TCartProduct[] = [...cartProducts];
            if (purchasedIndex > -1) {
              purchasedProducts[purchasedIndex].number += 1; //TODO: logic fix
            } else {
              purchasedProducts.push({
                title,
                img,
                price,
                number: 1
              })
            }
            setAmount(result);
            setCartProduct(purchasedProducts);
            RSwal.fire({
              type: 'success',
              title: `${title} is purchased!`
            });
          } else {
            RSwal.fire({
              type: 'error',
              title: '잔액이 부족합니다!',
              html: `잔액: ₩${totalAmount.toLocaleString()}이<br />책 가격: ₩${price.toLocaleString()}보다 적습니다.`
            });
          }
        }}
      />
    </Card.Content>
  </Card>
));