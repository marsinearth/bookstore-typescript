import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Book } from './bookSlice';
import RSwal from '../utils/reactSwal';
import toWon from '../utils/formatCurrency';

export interface CartProduct extends Book {
  createdAt: Date;
  number: number;
}

export interface CartState {
  account: number;
  cartProducts: CartProduct[];
}

interface CartRemovePayload extends Book {
  removeAll?: boolean;
}

const initialState: CartState = {
  account: 40000,
  cartProducts: [],
};

const cartSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Book>) => {
      const { isbn, price, title } = action.payload;
      const resultAcc = state.account - price;
      if (resultAcc >= 0) {
        const productIndex = state.cartProducts.findIndex(
          ({ isbn: bid }) => bid === isbn,
        );
        if (productIndex > -1) {
          state.cartProducts[productIndex].createdAt = new Date();
          state.cartProducts[productIndex].number += 1;
        } else {
          if (action.payload) {
            const newProduct = {
              ...action.payload,
              createdAt: new Date(),
              number: 1,
            };
            state.cartProducts.push(newProduct);
          }
        }
        state.account = resultAcc;
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
    },
    remove: (state, action: PayloadAction<CartRemovePayload>) => {
      const { isbn, price, title, removeAll } = action.payload;
      const productIndex = state.cartProducts.findIndex(
        ({ isbn: bid }) => isbn === bid,
      ); // 무조건 존재
      const productNumInCart = state.cartProducts[productIndex].number;
      if (removeAll) {
        state.cartProducts.splice(productIndex, 1);
        RSwal('info', `${title} ${productNumInCart}개가 제거되었습니다.`);
        state.account += productNumInCart * price;
      } else {
        if (productNumInCart > 1) {
          state.cartProducts[productIndex].number -= 1;
        } else {
          state.cartProducts.splice(productIndex, 1);
        }
        RSwal('info', `${title} 1개가 제거되었습니다.`);
        state.account += price;
      }
    },
    reset: () => {
      RSwal('success', '카트가 초기화 되었습니다!');
      return initialState;
    },
  },
});

export const { add, remove, reset } = cartSlice.actions;

export default cartSlice.reducer;
