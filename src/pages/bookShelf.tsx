import { Book, updateBooks } from '../reduxSlices/bookSlice';
import { Card, Grid, Header, Segment } from 'semantic-ui-react';
import React, { memo } from 'react';

import BookSimple from '../components/bookSimple';
import { Connect } from 'aws-amplify-react';
import { IConnectState } from 'aws-amplify-react/lib-esm/API/GraphQL/Connect';
import Spinner from 'react-spinkit';
import { graphqlOperation } from '@aws-amplify/api';
import { listBooks } from '../graphql/queries';
import { useDispatch } from 'react-redux';

const BookShelf = () => {
  const dispatch = useDispatch();

  return (
    <Segment raised>
      <Grid centered padded columns="three">
        <Header as="h2" content="Book Shelf" textAlign="center" />
        <Grid.Row>
          <Card.Group stackable>
            <Connect query={graphqlOperation(listBooks)}>
              {({ data: { listBooks }, loading, errors }: IConnectState) => {
                if (loading) {
                  return <Spinner name="cube-grid" />;
                } else if (listBooks) {
                  const { items: bookItems } = listBooks;
                  dispatch(updateBooks(bookItems));
                  return bookItems.map((book: Book) => (
                    <BookSimple key={book.isbn} {...book} />
                  ));
                }
              }}
            </Connect>
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

export default memo(BookShelf);
