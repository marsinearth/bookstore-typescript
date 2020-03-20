import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { S3ObjectInput } from '../API';

export type Book = {
  isbn: string;
  title: string;
  price: number;
  img?: S3ObjectInput;
  author?: string;
  publisher?: string;
  release?: string;
  description?: string;
};

const bookSlice = createSlice({
  name: 'book',
  initialState: [] as Book[],
  reducers: {
    updateBooks: (_, action: PayloadAction<Book[]>) => {
      const books = action.payload;
      return books;
    },
  },
});

export const bookSelector = createSelector<
  RootState,
  string,
  Book[],
  string,
  Book | undefined
>([({ books }, _) => books, (_, isbn) => isbn], (books, isbn) =>
  books.find(({ isbn: bid }) => bid === isbn),
);

export const { updateBooks } = bookSlice.actions;

export default bookSlice.reducer;
