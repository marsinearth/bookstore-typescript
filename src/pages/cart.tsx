import {
  Button,
  Grid,
  Header,
  Item,
  Label,
  Rail,
  Segment,
} from 'semantic-ui-react'
import React, { Dispatch, memo, useCallback } from 'react'
import { TAction, TCartProduct, useStateValue } from '../contexts/bookReducer'
import bookList, { TBook } from '../assets/data/books'

import { RouteComponentProps } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import toWon from '../utils/formatCurrency'

type TCartProductProps = TCartProduct & {
  dispatch: Dispatch<TAction>
}

const CartProduct = memo<TCartProductProps>(
  ({ isbn, createdAt, number, dispatch }) => {
    const { img, title, price } =
      (bookList.find(({ isbn: bid }) => bid === isbn) as TBook) || {}
    return (
      <Item key={isbn}>
        <Item.Image size='tiny' src={img} />
        <Item.Content>
          <Item.Header>{title}</Item.Header>
          <Item.Meta>{toWon(price)}</Item.Meta>
          <Item.Description>{`${number}개`}</Item.Description>
          <Button
            content='remove'
            icon='trash'
            labelPosition='left'
            onClick={useCallback(() => {
              dispatch({
                type: 'remove-item',
                isbn,
                price,
                title,
              })
            }, [dispatch, isbn, price, title])}
          />
        </Item.Content>
        <Item.Extra>
          <Label floated='right'>{formatDistance(createdAt, new Date())}</Label>
        </Item.Extra>
      </Item>
    )
  },
)

export default memo<RouteComponentProps>(({ history: { goBack } }) => {
  const [{ cartProducts }, dispatch] = useStateValue()
  return (
    <Segment raised>
      <Grid centered padded>
        <Grid.Column>
          <Header as='h1' content='Purchased Items' textAlign='center' />
          <Rail attached internal position='right'>
            <Button.Group>
              <Button
                content='Go back'
                icon='step backward'
                labelPosition='left'
                onClick={useCallback(() => {
                  goBack()
                }, [goBack])}
              />
              <Button.Or />
              <Button
                content='Reset'
                icon='undo'
                negative
                labelPosition='right'
                onClick={useCallback(() => {
                  dispatch({ type: 'reset-cart' })
                }, [dispatch])}
              />
            </Button.Group>
          </Rail>
          <Item.Group divided>
            {cartProducts.map((props: TCartProduct) => (
              <CartProduct {...props} key={props.isbn} dispatch={dispatch} />
            ))}
          </Item.Group>
        </Grid.Column>
      </Grid>
    </Segment>
  )
})
