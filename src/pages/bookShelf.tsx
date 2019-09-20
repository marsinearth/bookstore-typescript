import { Card, Grid, Header, Segment } from 'semantic-ui-react'
import React, { memo } from 'react'

import BookSimple from '../components/bookSimple'
import bookList from '../assets/data/books'

export default memo(() => (
  <Segment raised>
    <Grid centered padded columns='three'>
      <Header as='h2' content='Book Shelf' textAlign='center' />
      <Grid.Row>
        <Card.Group stackable>
          {bookList.map((props) => (
            <BookSimple key={props.isbn} {...props} />
          ))}
        </Card.Group>
      </Grid.Row>
    </Grid>
  </Segment>
))
