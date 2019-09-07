import React, { FC, ReactNode, useReducer, createContext, useContext, Dispatch } from 'react';
import bookList, { TBook } from '../assets/data/books';
import RSwal from '../utils/reactSwal';
import toWon from '../utils/formatCurrency';

export type TCartProduct = Pick<TBook, 'bookId'> & {
  number: number
}

type TState = {
  account: number,
  cartProducts: TCartProduct[]
}

type TItemAction = {
  type: 'add-item' | 'remove-item',
  price: number,
  bookId: number,
  title: string
}

type TResetAction = {
  type: 'reset-cart'
}

export type TAction = TItemAction | TResetAction

type TContext = [TState, Dispatch<TAction>]

const initialState: TState = {
  account: 40000,
  cartProducts: []
}

const reducer = (state: TState, action: TAction) => {
  const cartProducts = [...state.cartProducts]
  switch (action.type) {
    case 'add-item': {
      const { bookId, price, title } = action
      const resultAcc = state.account - price
      if (resultAcc >= 0) {
        const productIndex = cartProducts.findIndex(({ bookId: bid }) => bid === bookId)
        if (productIndex > -1) {
          cartProducts[productIndex].number += 1
        } else {
          const book = bookList.find(({ bookId: bid }) => bid === bookId)
          if (book) {
            const newProduct = {
              ...book,
              number: 1
            }
            cartProducts.push(newProduct)
          }
        }
        RSwal('success', `${title} is purchased!`)
      } else {
        RSwal('error', '잔액이 부족합니다!', `잔액: ${toWon(state.account)}이<br />책 가격: ${toWon(price)}보다 적습니다.`)
      }
      
      return {
        account: resultAcc >= 0 ? resultAcc : state.account,
        cartProducts
      }
    }
    case 'remove-item': {
      const { bookId, price, title } = action
      const productIndex = cartProducts.findIndex(({ bookId: bid }) => bookId === bid) // 무조건 존재
      const productNumInCart = cartProducts[productIndex].number
      if (productNumInCart > 1) {
        cartProducts[productIndex].number -= 1
      } else {
        cartProducts.splice(productIndex, 1)
      }
      RSwal('info', `${title} 1개가 제거되었습니다.`);

      return {
        account: state.account + price,
        cartProducts
      }
    }
    case 'reset-cart':
      RSwal('success', '카트가 초기화 되었습니다!')
      return initialState
    default:
      return state
  }
}

const StateContext = createContext<TContext>([initialState, () => null]);

export const StateProvider: FC<ReactNode> = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext)
