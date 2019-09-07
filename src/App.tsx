import React, { memo } from 'react';
import Home from './pages/home';
import { StateProvider } from './contexts/bookReducer';

export default memo(() => {
  return (
    <StateProvider>
      <Home />
    </StateProvider>
  );
})
