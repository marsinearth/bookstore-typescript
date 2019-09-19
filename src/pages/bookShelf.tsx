import { Card, Grid, Header, Segment } from 'semantic-ui-react'
import React, { memo } from 'react'

import Book from '../components/book'
import bookList from '../assets/data/books'

export default memo(() => (
  <Segment raised>
    <Grid centered padded>
      <Header as='h2' content='Book Shelf' textAlign='center' />
      <Grid.Row>
        <Card.Group stackable>
          {bookList.map((props) => (
            <Book key={props.bookId} {...props} />
          ))}
        </Card.Group>
      </Grid.Row>
    </Grid>
  </Segment>
))
