/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  sub: string,
  name: string,
  account?: number | null,
};

export type ModelUserConditionInput = {
  sub?: ModelIDInput | null,
  name?: ModelStringInput | null,
  account?: ModelIntInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateUserInput = {
  id: string,
  sub?: string | null,
  name?: string | null,
  account?: number | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateBookInput = {
  isbn: string,
  title: string,
  price: number,
  img?: S3ObjectInput | null,
  author?: string | null,
  publisher?: string | null,
  release?: string | null,
  description?: string | null,
};

export type S3ObjectInput = {
  bucket: string,
  region: string,
  key: string,
};

export type ModelBookConditionInput = {
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  author?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  release?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelBookConditionInput | null > | null,
  or?: Array< ModelBookConditionInput | null > | null,
  not?: ModelBookConditionInput | null,
};

export type UpdateBookInput = {
  isbn: string,
  title?: string | null,
  price?: number | null,
  img?: S3ObjectInput | null,
  author?: string | null,
  publisher?: string | null,
  release?: string | null,
  description?: string | null,
};

export type DeleteBookInput = {
  isbn: string,
};

export type CreateCartItemInput = {
  id?: string | null,
  cartOwnerId: string,
  isbn: string,
  title: string,
  price: number,
  img?: S3ObjectInput | null,
  author?: string | null,
  publisher?: string | null,
  release?: string | null,
  description?: string | null,
  createdAt?: string | null,
  number: number,
};

export type ModelCartItemConditionInput = {
  cartOwnerId?: ModelStringInput | null,
  isbn?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  author?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  release?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  number?: ModelIntInput | null,
  and?: Array< ModelCartItemConditionInput | null > | null,
  or?: Array< ModelCartItemConditionInput | null > | null,
  not?: ModelCartItemConditionInput | null,
};

export type UpdateCartItemInput = {
  id: string,
  cartOwnerId?: string | null,
  isbn?: string | null,
  title?: string | null,
  price?: number | null,
  img?: S3ObjectInput | null,
  author?: string | null,
  publisher?: string | null,
  release?: string | null,
  description?: string | null,
  createdAt?: string | null,
  number?: number | null,
};

export type DeleteCartItemInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  sub?: ModelIDInput | null,
  name?: ModelStringInput | null,
  account?: ModelIntInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelBookFilterInput = {
  isbn?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  author?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  release?: ModelStringInput | null,
  description?: ModelStringInput | null,
  and?: Array< ModelBookFilterInput | null > | null,
  or?: Array< ModelBookFilterInput | null > | null,
  not?: ModelBookFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelCartItemFilterInput = {
  id?: ModelIDInput | null,
  cartOwnerId?: ModelStringInput | null,
  isbn?: ModelStringInput | null,
  title?: ModelStringInput | null,
  price?: ModelIntInput | null,
  author?: ModelStringInput | null,
  publisher?: ModelStringInput | null,
  release?: ModelStringInput | null,
  description?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  number?: ModelIntInput | null,
  and?: Array< ModelCartItemFilterInput | null > | null,
  or?: Array< ModelCartItemFilterInput | null > | null,
  not?: ModelCartItemFilterInput | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type CreateBookMutationVariables = {
  input: CreateBookInput,
  condition?: ModelBookConditionInput | null,
};

export type CreateBookMutation = {
  createBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type UpdateBookMutationVariables = {
  input: UpdateBookInput,
  condition?: ModelBookConditionInput | null,
};

export type UpdateBookMutation = {
  updateBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type DeleteBookMutationVariables = {
  input: DeleteBookInput,
  condition?: ModelBookConditionInput | null,
};

export type DeleteBookMutation = {
  deleteBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type CreateCartItemMutationVariables = {
  input: CreateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type CreateCartItemMutation = {
  createCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type UpdateCartItemMutationVariables = {
  input: UpdateCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type UpdateCartItemMutation = {
  updateCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type DeleteCartItemMutationVariables = {
  input: DeleteCartItemInput,
  condition?: ModelCartItemConditionInput | null,
};

export type DeleteCartItemMutation = {
  deleteCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      sub: string,
      name: string,
      account: number | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetBookQueryVariables = {
  isbn: string,
};

export type GetBookQuery = {
  getBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type ListBooksQueryVariables = {
  isbn?: string | null,
  filter?: ModelBookFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBooksQuery = {
  listBooks:  {
    __typename: "ModelBookConnection",
    items:  Array< {
      __typename: "Book",
      isbn: string,
      title: string,
      price: number,
      author: string | null,
      publisher: string | null,
      release: string | null,
      description: string | null,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCartItemQueryVariables = {
  id: string,
};

export type GetCartItemQuery = {
  getCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type ListCartItemsQueryVariables = {
  filter?: ModelCartItemFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCartItemsQuery = {
  listCartItems:  {
    __typename: "ModelCartItemConnection",
    items:  Array< {
      __typename: "CartItem",
      id: string,
      cartOwnerId: string,
      isbn: string,
      title: string,
      price: number,
      author: string | null,
      publisher: string | null,
      release: string | null,
      description: string | null,
      createdAt: string | null,
      number: number,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    sub: string,
    name: string,
    account: number | null,
    owner: string | null,
  } | null,
};

export type OnCreateBookSubscriptionVariables = {
  owner: string,
};

export type OnCreateBookSubscription = {
  onCreateBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type OnUpdateBookSubscriptionVariables = {
  owner: string,
};

export type OnUpdateBookSubscription = {
  onUpdateBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type OnDeleteBookSubscriptionVariables = {
  owner: string,
};

export type OnDeleteBookSubscription = {
  onDeleteBook:  {
    __typename: "Book",
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    owner: string | null,
  } | null,
};

export type OnCreateCartItemSubscriptionVariables = {
  owner: string,
};

export type OnCreateCartItemSubscription = {
  onCreateCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type OnUpdateCartItemSubscriptionVariables = {
  owner: string,
};

export type OnUpdateCartItemSubscription = {
  onUpdateCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};

export type OnDeleteCartItemSubscriptionVariables = {
  owner: string,
};

export type OnDeleteCartItemSubscription = {
  onDeleteCartItem:  {
    __typename: "CartItem",
    id: string,
    cartOwnerId: string,
    isbn: string,
    title: string,
    price: number,
    img:  {
      __typename: "S3Object",
      bucket: string,
      region: string,
      key: string,
    } | null,
    author: string | null,
    publisher: string | null,
    release: string | null,
    description: string | null,
    createdAt: string | null,
    number: number,
    owner: string | null,
  } | null,
};
