import React, { memo } from 'react';
import { Container, Card, Grid, Header, Segment } from 'semantic-ui-react';
import Book from '../components/book';
import Wallet from '../components/wallet';
import Cart from '../components/cart';
import bookList from '../assets/data/books';

export default memo(() => (
  <Container fluid>
    <Segment textAlign="center">
      <Header as='h1'>Book Store</Header>
      <p>샘플 북스토어</p>
    </Segment>
    <Grid centered>
      <Grid.Row>
        <Card.Group>
          <Wallet />
          <Cart />
        </Card.Group>
      </Grid.Row>
      <Grid.Row>
        <Card.Group stackable>
          {bookList.map(props => (
            <Book
              key={props.bookId}
              {...props}
            />
          ))}
        </Card.Group>
      </Grid.Row>
    </Grid>
  </Container>
));