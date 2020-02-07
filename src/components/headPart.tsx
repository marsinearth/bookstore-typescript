import { Header, Icon, Label, Segment } from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';

import toWon from '../utils/formatCurrency';
import { useStateValue } from '../contexts/bookReducer';

export default memo(() => {
  const { push } = useHistory();
  const { pathname } = useLocation();
  const [isPathCart, setPath] = useState(false);
  const [{ account, cartProducts }] = useStateValue();

  const cartLength = useMemo(() => {
    return cartProducts.reduce((total, { number }) => {
      total += number;
      return total;
    }, 0);
  }, [cartProducts]);

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
          송조현
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
