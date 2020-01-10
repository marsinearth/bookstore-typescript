import { ActionTypes, useStateValue } from '../contexts/bookReducer';
import { Button, Card, Divider, Image } from 'semantic-ui-react';
import React, { memo, useCallback } from 'react';

import { Link } from 'react-router-dom';
import { TBook } from '../assets/data/books';
import toWon from '../utils/formatCurrency';

export default memo(({ isbn, title, img, price }: TBook) => {
  const [, dispatch] = useStateValue();
  return (
    <Card>
      <Link to={`/detail/${isbn}`}>
        <Image src={img} alt={title} size="large" />
      </Link>
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
              type: ActionTypes.ADD,
              isbn,
              price,
              title,
            });
          }, [dispatch, isbn, price, title])}
        />
      </Card.Content>
    </Card>
  );
});
