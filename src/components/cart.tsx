import React, { memo, useCallback, Dispatch } from 'react'
import { Button, Card, Item } from 'semantic-ui-react'
import { useStateValue, TCartProduct, TAction } from '../contexts/bookReducer'
import toWon from '../utils/formatCurrency'
import bookList, { TBook } from '../assets/data/books'

type TCartProductProps = TCartProduct & {
  dispatch: Dispatch<TAction>
}

const CartProduct = memo(({
  bookId,
  number,
  dispatch
}: TCartProductProps) => {
  const { img, title, price } = bookList.find(({ bookId: bid }) => bid === bookId) as TBook || {}
  return (
    <Item key={bookId}>
      <Item.Image size="tiny" src={img} />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>{toWon(price)}</Item.Meta>
        <Item.Description>{`${number}개`}</Item.Description>
        <Button
          content="remove"
          icon="trash"
          labelPosition="left"
          onClick={useCallback(() => {
            dispatch({
              type: 'remove-item',
              bookId,
              price,
              title
            })            
          }, [bookId, dispatch])}
        />
      </Item.Content>
    </Item>
  )
})

export default memo(() => {
  const [{ cartProducts }, dispatch] = useStateValue()
  return (
    <Card>
      <Card.Content>
        <Card.Header>구입 목록</Card.Header>
        <Item.Group divided>
          {cartProducts.map((props: TCartProduct) => (
            <CartProduct key={props.bookId} dispatch={dispatch} {...props} />
          ))}
        </Item.Group>
      </Card.Content>
    </Card>
  );
});