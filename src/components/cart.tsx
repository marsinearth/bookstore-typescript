import React, { memo, useCallback, Dispatch } from 'react';
import { Button, Card, Item } from 'semantic-ui-react';
import RSwal from '../utils/reactSwal';
import { useStateValue, TCartProduct, TAction } from '../context/bookContext';
import toWon from '../utils/formatCurrency';

type TCartProductProps = TCartProduct & {
  dispatch: Dispatch<TAction>
}

const CartProduct = memo(({
  pid,
  img,
  title,
  number,
  price,
  dispatch
}: TCartProductProps) => {
  return (
    <Item key={pid}>
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
              pid,
              price
            })
            RSwal('info', `${title} 1개가 제거되었습니다.`);
          }, [pid, dispatch])}
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
            <CartProduct key={props.pid} dispatch={dispatch} {...props} />
          ))}
        </Item.Group>
      </Card.Content>
    </Card>
  );
});