import React, { FC, ReactNode, useReducer, createContext, useContext, Dispatch } from 'react';
import uuidV1 from 'uuid/v1';
import bookList, { TBook } from '../assets/data/books';

export type TCartProduct = TBook & {
  pid: string,
  number: number
}

type TState = {
  account: number,
  cartProducts: TCartProduct[]
}

type TAddItemAction = {
  type: 'add-item',
  price: number,
  bid: number
}

type TRemoveAction = {
  type: 'remove-item',
  price: number,
  pid: string
}

type TResetAction = {
  type: 'reset-cart'
}

export type TAction = TAddItemAction | TRemoveAction | TResetAction

type TContext = [TState, Dispatch<TAction>]

const initialState: TState = {
  account: 40000,
  cartProducts: []
}

const reducer = (state: TState, action: TAction) => {
  const cartProducts = [...state.cartProducts]
  switch (action.type) {
    case 'add-item': {
      const { bid, price } = action
      const productIndex = cartProducts.findIndex(({ bookId }) => bookId === bid)
      if (productIndex > -1) {
        cartProducts[productIndex].number += 1
      } else {
        const book = bookList.find(({ bookId }) => bookId === bid)
        if (book) {
          const newProduct = {
            ...book,
            number: 1,
            pid: uuidV1()
          }
          cartProducts.push(newProduct)
        }
      }
      return {
        account: state.account - price,
        cartProducts
      }
    }
    case 'remove-item': {
      const { pid, price } = action
      const productIndex = cartProducts.findIndex(({ pid: productId }) => productId === pid) // 무조건 존재함
      const productNumInCart = cartProducts[productIndex].number
      if (productNumInCart > 1) {
        cartProducts[productIndex].number -= 1
      } else {
        cartProducts.splice(productIndex, 1)
      }
      return {
        account: state.account + price,
        cartProducts
      }
    }
    case 'reset-cart':
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
