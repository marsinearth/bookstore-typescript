// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    sub
    name
    account
    owner
  }
}
`;
export const updateUser = `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    sub
    name
    account
    owner
  }
}
`;
export const deleteUser = `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    sub
    name
    account
    owner
  }
}
`;
export const createBook = `mutation CreateBook(
  $input: CreateBookInput!
  $condition: ModelBookConditionInput
) {
  createBook(input: $input, condition: $condition) {
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    owner
  }
}
`;
export const updateBook = `mutation UpdateBook(
  $input: UpdateBookInput!
  $condition: ModelBookConditionInput
) {
  updateBook(input: $input, condition: $condition) {
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    owner
  }
}
`;
export const deleteBook = `mutation DeleteBook(
  $input: DeleteBookInput!
  $condition: ModelBookConditionInput
) {
  deleteBook(input: $input, condition: $condition) {
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    owner
  }
}
`;
export const createCartItem = `mutation CreateCartItem(
  $input: CreateCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  createCartItem(input: $input, condition: $condition) {
    id
    cartOwnerId
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    createdAt
    number
    owner
  }
}
`;
export const updateCartItem = `mutation UpdateCartItem(
  $input: UpdateCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  updateCartItem(input: $input, condition: $condition) {
    id
    cartOwnerId
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    createdAt
    number
    owner
  }
}
`;
export const deleteCartItem = `mutation DeleteCartItem(
  $input: DeleteCartItemInput!
  $condition: ModelCartItemConditionInput
) {
  deleteCartItem(input: $input, condition: $condition) {
    id
    cartOwnerId
    isbn
    title
    price
    img {
      bucket
      region
      key
    }
    author
    publisher
    release
    description
    createdAt
    number
    owner
  }
}
`;
