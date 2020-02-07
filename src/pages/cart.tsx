import {
  ActionTypes,
  TAction,
  TCartProduct,
  useStateValue,
} from '../contexts/bookReducer';
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
import { Link, useHistory } from 'react-router-dom';
import React, { Dispatch, memo, useCallback } from 'react';
import bookList, { TBook } from '../assets/data/books';

import { formatDistance } from 'date-fns';
import toWon from '../utils/formatCurrency';

type TCartProductProps = TCartProduct & {
  dispatch: Dispatch<TAction>;
};

const CartProduct = memo<TCartProductProps>(
  ({ isbn, createdAt, number, dispatch }) => {
    const { img, title, price } =
      (bookList.find(({ isbn: bid }) => bid === isbn) as TBook) || {};
    const onClick = useCallback(
      ({ removeAll }) => {
        dispatch({
          type: ActionTypes.REMOVE,
          isbn,
          price,
          title,
          removeAll,
        });
      },
      [dispatch, isbn, price, title],
    );
    return (
      <Item>
        <Link to={`/detail/${isbn}`}>
          <Item.Image size="small" src={img} />
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
                onClick={() => onClick({ removeAll: true })}
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
  const [{ cartProducts }, dispatch] = useStateValue();
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
                  dispatch({ type: ActionTypes.RESET });
                }, [dispatch])}
              />
            </Button.Group>
          </Rail>
          <Item.Group divided>
            {cartProducts.length ? (
              cartProducts.map((props: TCartProduct) => (
                <CartProduct {...props} key={props.isbn} dispatch={dispatch} />
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
