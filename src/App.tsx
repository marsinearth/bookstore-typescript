import React, { memo } from 'react'

import Router from './routes'
import { StateProvider } from './contexts/bookReducer'

export default memo(() => {
  return (
    <StateProvider>
      <Router />
    </StateProvider>
  )
})
