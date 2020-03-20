/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null;
  sub: string;
  name: string;
  account?: number | null;
  _version?: number | null;
};

export type ModelUserConditionInput = {
  sub?: ModelIDInput | null;
  name?: ModelStringInput | null;
  account?: ModelIntInput | null;
  and?: Array<ModelUserConditionInput | null> | null;
  or?: Array<ModelUserConditionInput | null> | null;
  not?: ModelUserConditionInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type ModelIntInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
};

export type UpdateUserInput = {
  id: string;
  sub?: string | null;
  name?: string | null;
  account?: number | null;
  _version?: number | null;
};

export type DeleteUserInput = {
  id?: string | null;
  _version?: number | null;
};

export type CreateBookInput = {
  isbn: string;
  title: string;
  price: number;
  img?: S3ObjectInput | null;
  author?: string | null;
  publisher?: string | null;
  release?: string | null;
  description?: string | null;
  _version?: number | null;
};

export type S3ObjectInput = {
  bucket: string;
  region: string;
  key: string;
};

export type ModelBookConditionInput = {
  title?: ModelStringInput | null;
  price?: ModelIntInput | null;
  author?: ModelStringInput | null;
  publisher?: ModelStringInput | null;
  release?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelBookConditionInput | null> | null;
  or?: Array<ModelBookConditionInput | null> | null;
  not?: ModelBookConditionInput | null;
};

export type UpdateBookInput = {
  isbn: string;
  title?: string | null;
  price?: number | null;
  img?: S3ObjectInput | null;
  author?: string | null;
  publisher?: string | null;
  release?: string | null;
  description?: string | null;
  _version?: number | null;
};

export type DeleteBookInput = {
  isbn: string;
  _version?: number | null;
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null;
  sub?: ModelIDInput | null;
  name?: ModelStringInput | null;
  account?: ModelIntInput | null;
  and?: Array<ModelUserFilterInput | null> | null;
  or?: Array<ModelUserFilterInput | null> | null;
  not?: ModelUserFilterInput | null;
};

export type ModelBookFilterInput = {
  isbn?: ModelStringInput | null;
  title?: ModelStringInput | null;
  price?: ModelIntInput | null;
  author?: ModelStringInput | null;
  publisher?: ModelStringInput | null;
  release?: ModelStringInput | null;
  description?: ModelStringInput | null;
  and?: Array<ModelBookFilterInput | null> | null;
  or?: Array<ModelBookFilterInput | null> | null;
  not?: ModelBookFilterInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type CreateUserMutationVariables = {
  input: CreateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type CreateUserMutation = {
  createUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput;
  condition?: ModelUserConditionInput | null;
};

export type UpdateUserMutation = {
  updateUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput;
  condition?: ModelUserConditionInput | null;
};

export type DeleteUserMutation = {
  deleteUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type CreateBookMutationVariables = {
  input: CreateBookInput;
  condition?: ModelBookConditionInput | null;
};

export type CreateBookMutation = {
  createBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type UpdateBookMutationVariables = {
  input: UpdateBookInput;
  condition?: ModelBookConditionInput | null;
};

export type UpdateBookMutation = {
  updateBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type DeleteBookMutationVariables = {
  input: DeleteBookInput;
  condition?: ModelBookConditionInput | null;
};

export type DeleteBookMutation = {
  deleteBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type SyncUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncUsersQuery = {
  syncUsers: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      sub: string;
      name: string;
      account: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetUserQueryVariables = {
  id: string;
};

export type GetUserQuery = {
  getUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
};

export type ListUsersQuery = {
  listUsers: {
    __typename: 'ModelUserConnection';
    items: Array<{
      __typename: 'User';
      id: string;
      sub: string;
      name: string;
      account: number | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type SyncBooksQueryVariables = {
  filter?: ModelBookFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  lastSync?: number | null;
};

export type SyncBooksQuery = {
  syncBooks: {
    __typename: 'ModelBookConnection';
    items: Array<{
      __typename: 'Book';
      isbn: string;
      title: string;
      price: number;
      author: string | null;
      publisher: string | null;
      release: string | null;
      description: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type GetBookQueryVariables = {
  isbn: string;
};

export type GetBookQuery = {
  getBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type ListBooksQueryVariables = {
  isbn?: string | null;
  filter?: ModelBookFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListBooksQuery = {
  listBooks: {
    __typename: 'ModelBookConnection';
    items: Array<{
      __typename: 'Book';
      isbn: string;
      title: string;
      price: number;
      author: string | null;
      img: {
        __typename: 'S3Object';
        key: string;
      } | null;
      publisher: string | null;
      release: string | null;
      description: string | null;
      _version: number;
      _deleted: boolean | null;
      _lastChangedAt: number;
      owner: string | null;
    } | null> | null;
    nextToken: string | null;
    startedAt: number | null;
  } | null;
};

export type OnCreateUserSubscriptionVariables = {
  owner: string;
};

export type OnCreateUserSubscription = {
  onCreateUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type OnUpdateUserSubscriptionVariables = {
  owner: string;
};

export type OnUpdateUserSubscription = {
  onUpdateUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type OnDeleteUserSubscriptionVariables = {
  owner: string;
};

export type OnDeleteUserSubscription = {
  onDeleteUser: {
    __typename: 'User';
    id: string;
    sub: string;
    name: string;
    account: number | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type OnCreateBookSubscriptionVariables = {
  owner: string;
};

export type OnCreateBookSubscription = {
  onCreateBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type OnUpdateBookSubscriptionVariables = {
  owner: string;
};

export type OnUpdateBookSubscription = {
  onUpdateBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};

export type OnDeleteBookSubscriptionVariables = {
  owner: string;
};

export type OnDeleteBookSubscription = {
  onDeleteBook: {
    __typename: 'Book';
    isbn: string;
    title: string;
    price: number;
    img: {
      __typename: 'S3Object';
      bucket: string;
      region: string;
      key: string;
    } | null;
    author: string | null;
    publisher: string | null;
    release: string | null;
    description: string | null;
    _version: number;
    _deleted: boolean | null;
    _lastChangedAt: number;
    owner: string | null;
  } | null;
};
