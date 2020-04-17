import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';

import { RootState } from '../store';
import { S3ObjectInput } from '../API';
import { listBooks } from '../graphql/queries';

export type Book = {
  isbn: string;
  title: string;
  price: number;
  img?: S3ObjectInput;
  author?: string;
  publisher?: string;
  release?: string;
  description?: string;
  owner?: string;
};

// AWS amplify에 저장된 Book 데이터를 불러온다.
// https://redux-toolkit.js.org/api/createAsyncThunk 참고
export const fetchBooks = createAsyncThunk('book/fetchBooks', async () => {
  try {
    const { data } = (await API.graphql(
      graphqlOperation(listBooks),
    )) as GraphQLResult<{ listBooks: { items: Book[] } }>;
    if (data?.listBooks.items.length) {
      return data.listBooks.items;
    }
  } catch (err) {
    console.error(`error on fetchBooks: ${err}`);
  }
});

export interface BookState {
  loading: boolean;
  items: Book[];
}

const initialState: BookState = {
  loading: false,
  items: [],
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.rejected, state => {
      state.loading = false;
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      if (action.payload?.length) {
        state.loading = false;
        state.items = action.payload;
      }
    });
  },
});

// 리덕스의 books데이터 중 선택된 id의 book만을 가져와서 불러주는 selector. books의 내용이 바뀌지 않는 한(배열 안의 첫번째 element),
// 이 selector가 사용되는 useSelector는 리렌더 되지 않는다. reselect(https://github.com/reduxjs/reselect) 사용법 참고바람.
export const bookSelector = createSelector<
  RootState,
  string,
  Book[],
  string,
  Book | undefined
>([({ books: { items } }, _) => items, (_, isbn) => isbn], (books, isbn) =>
  books.find(({ isbn: bid }) => bid === isbn),
);

export default bookSlice.reducer;
