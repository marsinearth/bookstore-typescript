import React, { memo } from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import BookDetail from './pages/bookDetail'
import BookShelf from './pages/bookShelf'
import Cart from './pages/cart'
import { Container } from 'semantic-ui-react'
import HeadPart from './components/headPart'

export default memo(() => {
  return (
    <Router>
      <Container fluid>
        <HeadPart />
        <Switch>
          <Route exact path='/' component={BookShelf} />
          <Route path='/detail/:isbn' component={BookDetail} />
          <Route path='/cart' component={Cart} />
        </Switch>
      </Container>
    </Router>
  )
})
