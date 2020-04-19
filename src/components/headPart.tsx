import {
  CartProduct,
  cartItemsSelector,
  fetchCartItems,
} from '../reduxSlices/cartSlice';
import { Header, Icon, Label, Segment } from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { User } from '../reduxSlices/userSlice';
import toWon from '../utils/formatCurrency';

export default memo(() => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isPathCart, setPath] = useState(false);
  const cartProducts = useSelector<RootState, CartProduct[]>(({ cart }) =>
    cartItemsSelector.selectAll(cart),
  );
  const { account, name } = useSelector<RootState, User>(state => state.user);

  const cartLength = useMemo(() => {
    return cartProducts.reduce((total, { number }) => {
      total += number;
      return total;
    }, 0);
  }, [cartProducts]);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  useEffect(() => {
    if (pathname === '/cart') {
      setPath(true);
    } else {
      setPath(false);
    }
  }, [pathname]);

  const navigateToCart = useCallback(() => {
    if (!isPathCart) {
      push('/cart');
    }
  }, [push, isPathCart]);

  return (
    <Segment textAlign="center" raised>
      <Link to="/">
        <Header as="h1" icon>
          <Icon name="book" circular />
          <Header.Content>React Book Store</Header.Content>
        </Header>
      </Link>
      <Segment attached="bottom" compact style={{ border: 'none' }}>
        <Label
          as={isPathCart ? 'span' : 'a'}
          color={isPathCart ? undefined : 'teal'}
          size="large"
          image
          onClick={navigateToCart}
        >
          <Icon name="user circle" />
          {name}
          <Label.Detail>
            <Icon name="cart" />
            {!!cartLength && (
              <Label
                size="mini"
                circular
                color="red"
                floating
                content={cartLength}
              />
            )}
          </Label.Detail>
        </Label>
        <Label size="large" image>
          {toWon(account)}
          <Label.Detail>
            <Icon name="money" />
          </Label.Detail>
        </Label>
      </Segment>
    </Segment>
  );
});
