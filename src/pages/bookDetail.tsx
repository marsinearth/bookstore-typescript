import { Book, bookSelector } from '../reduxSlices/bookSlice';
import {
  Button,
  Container,
  Grid,
  Header,
  Label,
  Rail,
  Segment,
} from 'semantic-ui-react';
import React, { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { RootState } from '../store';
import { S3Image } from 'aws-amplify-react';
import { add } from '../reduxSlices/cartSlice';
import toWon from '../utils/formatCurrency';

type ISBN = Pick<Book, 'isbn'>;

const BookDetail = memo<ISBN>(({ isbn }) => {
  const dispatch = useDispatch();
  const book = useSelector<RootState, Book | undefined>(state =>
    bookSelector(state, isbn),
  );
  if (!book) {
    return null;
  } else {
    const { img, title, author, publisher, release, price, description } = book;
    const formattedDesc = useMemo(
      () =>
        description
          ? description.split('\r\n').map((desc, i) => <p key={i}>{desc}</p>)
          : null,
      [description],
    );
    console.log({ book });
    return (
      <Container>
        <Grid centered padded columns="two">
          <Grid.Row>
            <Grid.Column>
              <S3Image
                imgKey={img?.key}
                theme={{ photoImg: { width: '100%', height: '100%' } }}
              />
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
                  dispatch(add(book));
                }, [dispatch, book])}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
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
