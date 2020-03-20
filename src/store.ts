import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  PersistConfig,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import books, { Book } from './reduxSlices/bookSlice';
import cart, { CartState } from './reduxSlices/cartSlice';
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import user, { UserState } from './reduxSlices/userSlice';

import storage from 'redux-persist/lib/storage';

export interface RootState {
  user: UserState;
  books: Book[];
  cart: CartState;
}

const { NODE_ENV } = process.env;

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user,
  books,
  cart,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: NODE_ENV === 'development',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

const persistor = persistStore(store);

export { store, persistor };
