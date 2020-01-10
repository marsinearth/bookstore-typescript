import React, {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import bookList, { TBook } from '../assets/data/books';

import RSwal from '../utils/reactSwal';
import toWon from '../utils/formatCurrency';

export type TCartProduct = Pick<TBook, 'isbn'> & {
  createdAt: Date;
  number: number;
};

type TState = {
  account: number;
  cartProducts: TCartProduct[];
};

export enum ActionTypes {
  ADD = 'add-item',
  REMOVE = 'remove-item',
  RESET = 'reset-items',
}

type TItemAction = {
  type: ActionTypes.ADD | ActionTypes.REMOVE;
  price: number;
  isbn: string;
  title: string;
  removeAll?: boolean;
};

type TResetAction = {
  type: ActionTypes.RESET;
};

export type TAction = TItemAction | TResetAction;

type TContext = [TState, Dispatch<TAction>];

const initialState: TState = {
  account: 40000,
  cartProducts: [],
};

const reducer = (state: TState, action: TAction) => {
  const cartProducts = [...state.cartProducts];
  switch (action.type) {
    case ActionTypes.ADD: {
      const { isbn, price, title } = action;
      const resultAcc = state.account - price;
      if (resultAcc >= 0) {
        const productIndex = cartProducts.findIndex(
          ({ isbn: bid }) => bid === isbn,
        );
        if (productIndex > -1) {
          cartProducts[productIndex].createdAt = new Date();
          cartProducts[productIndex].number += 1;
        } else {
          const book = bookList.find(({ isbn: bid }) => bid === isbn);
          if (book) {
            const newProduct = {
              ...book,
              createdAt: new Date(),
              number: 1,
            };
            cartProducts.push(newProduct);
          }
        }
        RSwal('success', `${title} is purchased!`);
      } else {
        RSwal(
          'error',
          '잔액이 부족합니다!',
          `잔액: ${toWon(state.account)}이<br />책 가격: ${toWon(
            price,
          )}보다 적습니다.`,
        );
      }

      return {
        account: resultAcc >= 0 ? resultAcc : state.account,
        cartProducts,
      };
    }
    case ActionTypes.REMOVE: {
      const { isbn, price, title, removeAll } = action;
      const productIndex = cartProducts.findIndex(
        ({ isbn: bid }) => isbn === bid,
      ); // 무조건 존재
      const productNumInCart = cartProducts[productIndex].number;
      let account = state.account;
      if (removeAll) {
        cartProducts.splice(productIndex, 1);
        RSwal('info', `${title} ${productNumInCart}개가 제거되었습니다.`);
        account += productNumInCart * price;
      } else {
        if (productNumInCart > 1) {
          cartProducts[productIndex].number -= 1;
        } else {
          cartProducts.splice(productIndex, 1);
        }
        RSwal('info', `${title} 1개가 제거되었습니다.`);
        account += price;
      }

      return {
        account,
        cartProducts,
      };
    }
    case ActionTypes.RESET:
      RSwal('success', '카트가 초기화 되었습니다!');
      return initialState;
    default:
      return state;
  }
};

const StateContext = createContext<TContext>([initialState, () => null]);

export const StateProvider: FC<ReactNode> = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
