import React, { useCallback, memo } from 'react';
import { Button, Card, Divider, Image } from 'semantic-ui-react';
import RSwal from '../utils/reactSwal';
import { TBook } from '../assets/data/books';
import { useStateValue } from '../context/bookContext';
import toWon from '../utils/formatCurrency';

export default memo(({
  bookId,
  title,
  img,
  price,
}: TBook) => {
  const [{ account }, dispatch] = useStateValue()
  return (
    <Card>
      <Image
        src={img}
        alt={title}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{toWon(price)}</Card.Meta>
        <Divider />
        <Button
          content="Purchase"
          icon="cart plus"
          labelPosition="left"
          onClick={useCallback(() => {
            const result: number = account - price;
            if (result >= 0) {
              dispatch({
                type: 'add-item',
                bid: bookId,
                price
              })
              RSwal('success', `${title} is purchased!`);
            } else {
              RSwal('error', '잔액이 부족합니다!', `잔액: ${toWon(account)}이<br />책 가격: ${toWon(price)}보다 적습니다.`);
            }
          }, [bookId, account, dispatch])}
        />
      </Card.Content>
    </Card>
  )
});