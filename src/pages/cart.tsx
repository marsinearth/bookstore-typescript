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
  cartItemsSelector,
  removeItem,
  resetItem,
} from '../reduxSlices/cartSlice';
import { Link, useHistory } from 'react-router-dom';
import React, { MouseEvent, memo, useCallback } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { Dispatch } from 'redux';
import { RootState } from '../store';
import { S3Image } from 'aws-amplify-react';
import toWon from '../utils/formatCurrency';

type CartProductProps = {
  item: CartProduct;
  dispatch: Dispatch<any>;
};

type OnClickProps = MouseEvent & {
  removeAll?: boolean;
};

const CartItem = memo<CartProductProps>(({ dispatch, item }) => {
  const { isbn, img, title, price, createdAt, number } = item;
  const onClick = useCallback(
    ({ removeAll }: OnClickProps) => {
      if (item?.id) {
        dispatch(
          removeItem({
            ...item,
            removeAll,
          }),
        );
      }
    },
    [dispatch, item],
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
        <Item.Extra>{formatDistanceToNow(parseISO(createdAt))}</Item.Extra>
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
});

export default memo(() => {
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const cartProducts = useSelector<RootState, CartProduct[]>(({ cart }) =>
    cartItemsSelector.selectAll(cart),
  );

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
                  dispatch(resetItem());
                }, [dispatch])}
              />
            </Button.Group>
          </Rail>
          <Item.Group divided>
            {cartProducts.length ? (
              cartProducts.map((cartItem: CartProduct) => (
                <CartItem
                  item={cartItem}
                  key={cartItem.id}
                  dispatch={dispatch}
                />
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
