import { Book, BookState, fetchBooks } from '../reduxSlices/bookSlice';
import { Card, Grid, Header, Segment } from 'semantic-ui-react';
import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BookSimple from '../components/bookSimple';
import { RootState } from '../store';
import Spinner from 'react-spinkit';

const BookShelf = () => {
  const dispatch = useDispatch();
  const { loading, items } = useSelector<RootState, BookState>(
    ({ books }) => books,
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <Segment raised>
      <Grid centered padded columns="three">
        <Header as="h2" content="Book Shelf" textAlign="center" />
        <Grid.Row>
          <Card.Group stackable>
            {loading && <Spinner name="cube-grid" />}
            {items.map((book: Book) => (
              <BookSimple key={book.isbn} {...book} />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default memo(BookShelf);
