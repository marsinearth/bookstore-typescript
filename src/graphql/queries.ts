// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    sub
    name
    account
    owner
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      sub
      name
      account
      owner
    }
    nextToken
  }
}
`;
export const getBook = `query GetBook($isbn: String!) {
  getBook(isbn: $isbn) {
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
export const listBooks = `query ListBooks(
  $isbn: String
  $filter: ModelBookFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBooks(
    isbn: $isbn
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      isbn
      title
      price
      img {
        key
      }
      author
      publisher
      release
      description
      owner
    }
    nextToken
  }
}
`;
export const getCartItem = `query GetCartItem($id: ID!) {
  getCartItem(id: $id) {
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
export const listCartItems = `query ListCartItems(
  $filter: ModelCartItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listCartItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      cartOwnerId
      isbn
      title
      price
      img {
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
    nextToken
  }
}
`;
