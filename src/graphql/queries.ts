// tslint:disable
// this is an auto generated file. This will be overwritten

export const syncUsers = `query SyncUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUsers(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      sub
      name
      account
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}
`;
export const syncBooks = `query SyncBooks(
  $filter: ModelBookFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBooks(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      isbn
      title
      price
      author
      publisher
      release
      description
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
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
    _version
    _deleted
    _lastChangedAt
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
      author
      img {
        key
      }
      publisher
      release
      description
      _version
      _deleted
      _lastChangedAt
      owner
    }
    nextToken
    startedAt
  }
}
`;
