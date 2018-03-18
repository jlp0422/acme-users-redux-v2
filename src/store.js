import { createStore } from 'redux';

const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';

export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export const deleteUser = (id) => {
  const users = store.getState().users.filter( user => user.id !== id)
  return {
    type: DELETE_USER,
    users
  }
}

const initialState = {
  users: [],
  name: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return Object.assign({}, state, { users: action.users });
    case 'DELETE_USER':
      return Object.assign({}, state, { users: action.users })
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store;
