import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import {
  CreateCartItemMutationVariables,
  DeleteCartItemMutationVariables,
  ListCartItemsQueryVariables,
  UpdateCartItemMutationVariables,
} from '../API';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  createCartItem,
  deleteCartItem,
  updateCartItem,
} from '../graphql/mutations';
import { updateAccount, initialState as userState } from './userSlice';

import { Book } from './bookSlice';
import RSwal from '../utils/reactSwal';
import { RootState } from '../store';
import awsConfig from '../aws-exports';
import { listCartItems } from '../graphql/queries';
import toWon from '../utils/formatCurrency';

const {
  aws_user_files_s3_bucket_region: region,
  aws_user_files_s3_bucket: bucket,
} = awsConfig;

export interface CartProduct extends Book {
  id: string;
  cartOwnerId: string;
  createdAt: string;
  number: number;
}

export interface CartState {
  cartProducts: CartProduct[];
}

export interface RemoveItemParams extends CartProduct {
  removeAll?: boolean;
}

// AWS amplify에 저장된 Book 데이터를 불러온다.
// https://redux-toolkit.js.org/api/createAsyncThunk 참고
export const fetchCartItems = createAsyncThunk(
  'cart/fetchItems',
  async (_, { getState }) => {
    const { id } = (getState() as RootState).user;
    // 현재 userId의 모든 cartItem을 찾는다
    try {
      const { data } = (await API.graphql(
        graphqlOperation(listCartItems, {
          filter: { cartOwnerId: { eq: id } },
        } as ListCartItemsQueryVariables),
      )) as GraphQLResult<{
        listCartItems: { items: Array<CartProduct> };
      }>;
      if (data?.listCartItems.items.length) {
        return data.listCartItems.items;
      }
    } catch (err) {
      console.error(`error on cart/fetchItems: ${err}`);
    }
  },
);

const cartItemsAdapter = createEntityAdapter<CartProduct>({
  selectId: cartItem => cartItem.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

export const addItem = createAsyncThunk(
  'cart/addItem',
  async (book: Book, { getState, dispatch }) => {
    const { id, account } = (getState() as RootState).user;
    const { isbn, price, img, title } = book;
    const resultAcc = account - price;

    if (resultAcc >= 0) {
      // 잔액이 충분할 경우
      try {
        // 현재 추가하는 책의 isbn과 현재 cartOwnerId(=userId)로 등록된 cartItem이 있는지 찾는다.
        const { data } = (await API.graphql(
          graphqlOperation(listCartItems, {
            filter: { isbn: { eq: isbn }, cartOwnerId: { eq: id } },
          } as ListCartItemsQueryVariables),
        )) as GraphQLResult<{ listCartItems: { items: CartProduct[] } }>;
        if (data?.listCartItems.items.length) {
          const [{ id: cartId, number: cartNumber }] = data.listCartItems.items;
          if (cartId && cartNumber) {
            // 있으면 찾아낸 cartItem의 id로 해당 cartItem의 number를 업데이트 해준다.
            const { data: updateData } = (await API.graphql(
              graphqlOperation(updateCartItem, {
                input: { id: cartId, number: cartNumber + 1 },
              } as UpdateCartItemMutationVariables),
            )) as GraphQLResult<{ updateCartItem: CartProduct }>;
            if (updateData?.updateCartItem.id) {
              // user 리듀서의 updateAccount thunk action을 실행한다
              dispatch(updateAccount({ id, account: resultAcc })).then(() => {
                RSwal('success', `${title} 을 구입하였습니다!`);
              });
              return updateData.updateCartItem;
            }
          }
        } else {
          // 없으면 추가하는 책과 cartOwnerId로 새 cartItem을 만들어 준다.
          const { owner, ...rest } = book;
          const createCartItemVariables: CreateCartItemMutationVariables = {
            input: {
              ...rest,
              cartOwnerId: id,
              number: 1,
            },
          };
          if (img?.key) {
            createCartItemVariables.input.img = {
              key: img.key,
              bucket,
              region,
            };
          }
          const { data } = (await API.graphql(
            graphqlOperation(createCartItem, createCartItemVariables),
          )) as GraphQLResult<{ createCartItem: CartProduct }>;
          if (data?.createCartItem.id) {
            dispatch(updateAccount({ id, account: resultAcc })).then(() => {
              RSwal('success', `${title} 을 구입하였습니다!`);
            });
            return data.createCartItem;
          }
        }
      } catch (err) {
        console.error(`error on cart/addItem: ${err}`);
      }
    } else {
      // 잔액이 부족한 경우
      RSwal(
        'error',
        '잔액이 부족합니다!',
        `잔액: ${toWon(account)}이<br />책 가격: ${toWon(price)}보다 적습니다.`,
      );
    }
  },
);

export const removeItem = createAsyncThunk(
  'cart/removeItem',
  async (
    { id, price, title, number, removeAll }: RemoveItemParams,
    { getState, dispatch },
  ) => {
    const { id: userId, account } = (getState() as RootState).user;
    try {
      if (!removeAll && number > 1) {
        const { data: updateData } = (await API.graphql(
          graphqlOperation(updateCartItem, {
            input: { id, number: number - 1 },
          } as UpdateCartItemMutationVariables),
        )) as GraphQLResult<{ updateCartItem: CartProduct }>;
        if (updateData?.updateCartItem.id) {
          // user 리듀서의 updateAccount thunk action을 실행한다
          dispatch(
            updateAccount({ id: userId, account: account + price }),
          ).then(() => {
            RSwal('info', `${title} 1개가 제거되었습니다.`);
          });
          return updateData.updateCartItem;
        }
      } else {
        // number = 1 | removeAll 일 경우
        const { data } = (await API.graphql(
          graphqlOperation(deleteCartItem, {
            input: { id },
          } as DeleteCartItemMutationVariables),
        )) as GraphQLResult<{ deleteCartItem: CartProduct }>;
        if (data?.deleteCartItem.id) {
          // user 리듀서의 updateAccount thunk action을 실행한다
          dispatch(
            updateAccount({ id: userId, account: account + price * number }),
          ).then(() => {
            RSwal('info', `${title} ${number}개가 제거되었습니다.`);
          });
          return data.deleteCartItem;
        }
      }
    } catch (err) {
      console.error(`error on cart/removeItem: ${err}`);
    }
  },
);

export const resetItem = createAsyncThunk(
  'cart/resetItem',
  async (_, { getState, dispatch }) => {
    const { id } = (getState() as RootState).user;
    try {
      // 현재 userId의 모든 cartItem을 찾는다
      const { data } = (await API.graphql(
        graphqlOperation(listCartItems, {
          filter: { cartOwnerId: { eq: id } },
        } as ListCartItemsQueryVariables),
      )) as GraphQLResult<{ listCartItems: { items: CartProduct[] } }>;
      if (data?.listCartItems.items.length) {
        const deleteCartItems = data.listCartItems.items;
        for (let i = 0; i < deleteCartItems.length; i += 1) {
          // async 함수 안에서는 es6 array 문법보다는 for을 해야 await문이 먹는다
          const { data: deletedData } = (await API.graphql(
            graphqlOperation(deleteCartItem, {
              input: { id: deleteCartItems[i].id },
            } as DeleteCartItemMutationVariables),
          )) as GraphQLResult<{ deleteCartItem: CartProduct }>;
          if (deletedData?.deleteCartItem.id) {
            console.log(
              `${deletedData.deleteCartItem.title} 이 성공적으로 제거되었습니다.`,
            );
          }
          if (i === deleteCartItems.length - 1) {
            // user 리듀서의 initialState.account으로 업데이트 해준다
            dispatch(updateAccount({ id, account: userState.account })).then(
              () => {
                RSwal('success', '카트가 초기화 되었습니다!');
              },
            );
            return true;
          }
        }
      } else {
        RSwal('error', '이미 카트가 비어 있습니다!');
      }
    } catch (err) {
      console.error(`error on cart/resetItem: ${err}`);
    }
  },
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartItemsAdapter.getInitialState(),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCartItems.fulfilled, (state, action) => {
      if (action.payload) {
        cartItemsAdapter.upsertMany(state, action.payload);
      }
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      if (action.payload) {
        cartItemsAdapter.upsertOne(state, action.payload);
      }
    });
    builder.addCase(removeItem.fulfilled, (state, action) => {
      const {
        arg: { removeAll, number },
      } = action.meta;
      if (action.payload) {
        // deleteItem일 경우 deleted id을 반환하게끔 짜 놨기 때문에, 리듀서에도 반영
        if (!removeAll && number > 1) {
          cartItemsAdapter.updateOne(state, {
            id: action.payload.id,
            changes: action.payload,
          });
        } else {
          cartItemsAdapter.removeOne(state, action.payload.id);
        }
      }
    });
    builder.addCase(resetItem.fulfilled, (state, action) => {
      if (action.payload) {
        // FIXME: return 해야만 리덕스 스테이트에 리셋반영이 됨. 에러인듯. 추후에 고쳐질 가능성 농후
        return cartItemsAdapter.removeAll(state);
      }
    });
  },
});

export const cartItemsSelector = cartItemsAdapter.getSelectors();

export default cartSlice.reducer;
