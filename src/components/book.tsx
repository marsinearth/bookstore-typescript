import { Button, Card, Divider, Image } from 'semantic-ui-react';
import React, { memo, useCallback } from 'react';

import { TBook } from '../assets/data/books';
import toWon from '../utils/formatCurrency';
import { useStateValue } from '../contexts/bookReducer';

export default memo(({ bookId, title, img, price }: TBook) => {
  const [, dispatch] = useStateValue();
  return (
    <Card>
      <Image src={img} alt={title} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{toWon(price)}</Card.Meta>
        <Divider />
        <Button
          content='Purchase'
          icon='cart plus'
          labelPosition='left'
          onClick={useCallback(() => {
            dispatch({
              type: 'add-item',
              bookId,
              price,
              title,
            });
          }, [dispatch, bookId, price, title])}
        />
      </Card.Content>
    </Card>
  );
});
