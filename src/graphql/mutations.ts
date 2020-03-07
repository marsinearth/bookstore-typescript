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
