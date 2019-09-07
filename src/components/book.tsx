import React, { useCallback, memo } from 'react';
import { Button, Card, Divider, Image } from 'semantic-ui-react';
import { TBook } from '../assets/data/books';
import { useStateValue } from '../contexts/bookReducer';
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
            dispatch({
              type: 'add-item',
              bookId,
              price,
              title
            })
          }, [bookId, account, dispatch])}
        />
      </Card.Content>
    </Card>
  )
});