import { Book, bookSelector } from '../reduxSlices/bookSlice';
import {
  Button,
  Container,
  Grid,
  Header,
  Item,
  Label,
  Rail,
  Segment,
} from 'semantic-ui-react';
import {
  CartProduct,
  CartState,
  remove,
  reset,
} from '../reduxSlices/cartSlice';
import { Link, useHistory } from 'react-router-dom';
import React, { MouseEvent, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch } from 'redux';
import { RootState } from '../store';
import { S3Image } from 'aws-amplify-react';
import { formatDistance } from 'date-fns';
import toWon from '../utils/formatCurrency';

type CartProductProps = CartProduct & {
  dispatch: Dispatch;
};

type OnClickProps = MouseEvent & {
  removeAll?: boolean;
};

const CartItem = memo<CartProductProps>(
  ({ isbn, createdAt, number, dispatch }) => {
    const book = useSelector<RootState, Book | undefined>(state =>
      bookSelector(state, isbn),
    );
    const { img, title, price } = book as Book;
    const onClick = useCallback(
      ({ removeAll }: OnClickProps) => {
        if (book) {
          dispatch(
            remove({
              ...book,
              removeAll,
            }),
          );
        }
      },
      [dispatch, book],
    );
    return (
      <Item>
        <Link to={`/detail/${isbn}`}>
          <S3Image
            imgKey={img?.key}
            theme={{ photoImg: { width: 150, height: 200 } }}
          />
        </Link>
        <Item.Content style={{ paddingLeft: 20 }}>
          <Item.Extra>{formatDistance(createdAt, new Date())}</Item.Extra>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>{toWon(price)}</Item.Meta>
          <Item.Description>{`${number}개`}</Item.Description>
          {number > 1 ? (
            <Button.Group size="mini">
              <Button
                content="remove"
                icon="trash"
                labelPosition="left"
                onClick={onClick}
              />
              <Button.Or />
              <Button
                content="all"
                icon="trash alternate"
                negative
                labelPosition="right"
                onClick={e => onClick({ ...e, removeAll: true })}
              />
            </Button.Group>
          ) : (
            <Button
              content="remove"
              icon="trash"
              labelPosition="left"
              onClick={onClick}
            />
          )}
        </Item.Content>
      </Item>
    );
  },
);

export default memo(() => {
  const { goBack } = useHistory();
  const { cartProducts } = useSelector<RootState, CartState>(
    state => state.cart,
  );
  const dispatch = useDispatch();
  return (
    <Segment raised>
      <Grid centered padded>
        <Grid.Column>
          <Header as="h1" content="Purchased Items" textAlign="center" />
          <Rail attached internal position="right">
            <Button.Group>
              <Button
                content="Go back"
                icon="step backward"
                labelPosition="left"
                onClick={useCallback(() => {
                  goBack();
                }, [goBack])}
              />
              <Button.Or />
              <Button
                content="Reset"
                icon="undo"
                negative
                labelPosition="right"
                onClick={useCallback(() => {
                  dispatch(reset());
                }, [dispatch])}
              />
            </Button.Group>
          </Rail>
          <Item.Group divided>
            {cartProducts.length ? (
              cartProducts.map((props: CartProduct) => (
                <CartItem {...props} key={props.isbn} dispatch={dispatch} />
              ))
            ) : (
              <Container textAlign="center">
                <Label size="large" content="No Item" />
              </Container>
            )}
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
