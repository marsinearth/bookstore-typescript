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
    _version
    _deleted
    _lastChangedAt
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
    _version
    _deleted
    _lastChangedAt
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
    _version
    _deleted
    _lastChangedAt
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
    _version
    _deleted
    _lastChangedAt
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
    _version
    _deleted
    _lastChangedAt
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
    _version
    _deleted
    _lastChangedAt
    owner
  }
}
`;
