import React, { memo } from 'react';
import Home from './pages/home';
import { StateProvider } from './context/bookContext';

export default memo(() => {
  return (
    <StateProvider>
      <Home />
    </StateProvider>
  );
})
