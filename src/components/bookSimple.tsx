import { Button, Card, Divider } from 'semantic-ui-react';
import React, { memo, useCallback } from 'react';

import { Book } from '../reduxSlices/bookSlice';
import { Link } from 'react-router-dom';
import { S3Image } from 'aws-amplify-react';
import { add } from '../reduxSlices/cartSlice';
import toWon from '../utils/formatCurrency';
import { useDispatch } from 'react-redux';

export default memo((book: Book) => {
  const dispatch = useDispatch();
  const { isbn, title, img, price } = book;

  return (
    <Card>
      <Link to={`/detail/${isbn}`}>
        <S3Image
          imgKey={img?.key}
          theme={{ photoImg: { width: '100%', height: '100%' } }}
        />
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
            dispatch(add(book));
          }, [dispatch, book])}
        />
      </Card.Content>
    </Card>
  );
});
