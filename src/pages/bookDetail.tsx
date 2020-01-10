import { ActionTypes, useStateValue } from '../contexts/bookReducer';
import {
  Button,
  Container,
  Grid,
  Header,
  Image,
  Label,
  Rail,
  Segment,
} from 'semantic-ui-react';
import React, { memo, useCallback, useMemo } from 'react';
import bookList, { TBook } from '../assets/data/books';
import { useHistory, useParams } from 'react-router-dom';

import toWon from '../utils/formatCurrency';

type TISBN = Pick<TBook, 'isbn'>;

const BookDetail = memo<TISBN>(({ isbn }) => {
  const [, dispatch] = useStateValue();
  const {
    img,
    title,
    author,
    publisher,
    release,
    price,
    description,
  } = useMemo(
    () => (bookList.find(({ isbn: bid }) => bid === isbn) as TBook) || {},
    [isbn],
  );
  const formattedDesc = useMemo(
    () =>
      description
        ? description.split('\r\n').map((desc, i) => <p key={i}>{desc}</p>)
        : null,
    [description],
  );
  return (
    <Container>
      <Grid centered padded columns="two">
        <Grid.Row>
          <Grid.Column>
            <Image src={img} fluid />
          </Grid.Column>
          <Grid.Column>
            <Segment.Group>
              <Segment>
                <Header as="h2" textAlign="center">
                  {title}
                </Header>
                <Segment.Inline>
                  <Label ribbon="right">{`Release Date: ${release}`}</Label>
                </Segment.Inline>
              </Segment>
              <Segment>{`Author: ${author}`}</Segment>
              <Segment>{`Publisher: ${publisher}`}</Segment>
              <Segment>{formattedDesc}</Segment>
            </Segment.Group>
            <Button
              content={toWon(price)}
              floated="right"
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
});

export default memo(() => {
  const { goBack } = useHistory();
  const { isbn } = useParams();
  return (
    <Segment raised>
      <Grid centered padded>
        <Grid.Column>
          <Header as="h1" content="Purchased Items" textAlign="center" />
          <Rail attached internal position="right">
            <Button
              content="Go back"
              icon="step backward"
              labelPosition="left"
              onClick={useCallback(() => {
                goBack();
              }, [goBack])}
            />
          </Rail>
          {!!isbn && <BookDetail isbn={isbn} />}
        </Grid.Column>
      </Grid>
    </Segment>
  );
});
