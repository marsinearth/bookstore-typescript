import API, { GraphQLResult, graphqlOperation } from '@aws-amplify/api';
import {
  EntityState,
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

import RSwal from '../utils/reactSwal';
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

const booksAdapter = createEntityAdapter<Book>({
  selectId: book => book.isbn,
  sortComparer: (a, b) => (a.price >= b.price ? 1 : -1),
});

export interface BookState extends EntityState<Book> {
  loading: boolean;
}

const bookSlice = createSlice({
  name: 'book',
  initialState: booksAdapter.getInitialState({
    loading: false,
  }) as BookState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBooks.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchBooks.rejected, (state, action) => {
      state.loading = false;
      RSwal('error', JSON.stringify(action.error));
    });
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      if (action.payload?.length) {
        state.loading = false;
        booksAdapter.upsertMany(state, action.payload);
      }
    });
  },
});

// 리덕스의 books데이터 중 선택된 id의 book만을 가져와서 불러주는 selector. createEntityAdapter의 selector 함수를 이용.
// https://redux-toolkit.js.org/api/createEntityAdapter#selector-functions 참고바람
// 이 selector가 사용되는 useSelector는 리렌더 되지 않는다. reselect(https://github.com/reduxjs/reselect) 사용법 참고바람.
export const booksSelectors = booksAdapter.getSelectors();

export default bookSlice.reducer;
