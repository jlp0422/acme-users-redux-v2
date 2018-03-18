import { createStore } from 'redux';

const GET_ALL_USERS = 'GET_ALL_USERS';
const DELETE_USER = 'DELETE_USER';
const CHANGE_NAME = 'CHANGE_NAME';
const CREATE_USER = 'CREATE_USER';
const SET_NAME = 'SET_NAME';
const UPDATE_USER = 'UPDATE_USER';

const initialState = {
  users: [],
  name: ''
}

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

export const changeName = (input) => {
  return {
    type: CHANGE_NAME,
    name: input
  }
}

export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

export const setName = (name) => {
  return {
    type: SET_NAME,
    name
  }
}

export const updateUser = (user, users) => {
  return {
    type: UPDATE_USER,
    user,
    users
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_USERS':
      return Object.assign({}, state, { users: action.users });
    case 'DELETE_USER':
      return Object.assign({}, state, { users: action.users });
    case 'CHANGE_NAME':
      return Object.assign({}, state, { name: action.name });
    case 'CREATE_USER':
      return Object.assign({}, state, { users: [...state.users, action.user ]});
    case 'SET_NAME':
      return Object.assign({}, state, { name: action.name });
    case 'UPDATE_USER':
      return Object.assign({}, state, { users: [ ...action.users, action.user ]})
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store;
