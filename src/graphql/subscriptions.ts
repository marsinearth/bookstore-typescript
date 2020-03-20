// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser($owner: String!) {
  onCreateUser(owner: $owner) {
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
export const onUpdateUser = `subscription OnUpdateUser($owner: String!) {
  onUpdateUser(owner: $owner) {
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
export const onDeleteUser = `subscription OnDeleteUser($owner: String!) {
  onDeleteUser(owner: $owner) {
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
export const onCreateBook = `subscription OnCreateBook($owner: String!) {
  onCreateBook(owner: $owner) {
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
export const onUpdateBook = `subscription OnUpdateBook($owner: String!) {
  onUpdateBook(owner: $owner) {
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
export const onDeleteBook = `subscription OnDeleteBook($owner: String!) {
  onDeleteBook(owner: $owner) {
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
