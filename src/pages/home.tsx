import React, { memo, useState } from 'react';
import { Container, Card, Grid, Header, Segment } from 'semantic-ui-react';
import Book, { TBook } from '../components/book';
import Wallet, { TMoneyState, initialFinance } from '../components/wallet';
import Cart, { TCartProduct } from '../components/cart';
import BookData from '../assets/data/books.json';
import LearningReact from '../assets/images/learningReact.jpg';
import LearningReactNative from '../assets/images/learningReactNative.jpg';
import ReactUpAndLearning from '../assets/images/reactUpAndLearning.jpg';

const images = [LearningReact, LearningReactNative, ReactUpAndLearning];

const bookList: TBook[] = BookData.map((obj, i) => ({
  ...obj,
  img: images[i]
}));

export default memo(() => {
  const moneyState = useState<number>(initialFinance);
  const cartState = useState<TCartProduct[]>([]);
  return (
    <Container fluid>
      <Segment textAlign="center">
        <Header as='h1'>Book Store</Header>
        <p>샘플 북스토어</p>
      </Segment>
      <Grid centered>
        <Grid.Row>
          <Card.Group>
            <Wallet moneyState={moneyState} cartState={cartState} />
            <Cart moneyState={moneyState} cartState={cartState} />
          </Card.Group>
        </Grid.Row>
        <Grid.Row>
          <Card.Group stackable>
            {bookList.map(props => (
              <Book
                key={props.title}
                moneyState={moneyState}
                cartState={cartState}
                {...props}
              />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Container>
  );
});