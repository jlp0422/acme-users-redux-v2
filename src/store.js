/* eslint-disable */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

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

// getting users from server
export const getAllUsers = (users) => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

export function getAllUsersThunk() {
  return function thunk(dispatch) {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        const action = getAllUsers(users)
        dispatch(action)
      })
  }
}

// deleting user from server
export const deleteUser = (id) => {
  const users = store.getState().users.filter( user => user.id !== id)
  return {
    type: DELETE_USER,
    users
  }
}

export function deleteUserThunk(id) {
  return function thunk(dispatch) {
    axios.delete(`/api/users/${id}`)
      .then(res => res.config.url)
      .then(url => {
        const id = url.split('/')[3]
        const action = deleteUser(id * 1)
        dispatch(action)
      })
  }
}

// input changes on form
export const changeName = (input) => {
  return {
    type: CHANGE_NAME,
    name: input
  }
}

// creating user, adding to server
export const createUser = (user) => {
  return {
    type: CREATE_USER,
    user
  }
}

export function createUserThunk(name) {
  return function thunk(dispatch) {
    axios.post('/api/users', ({ name }))
      .then( res => res.data)
      .then( user => {
        const action = createUser(user)
        dispatch(action)
      })
      .then(() => location.hash = '/')
  }
}

// setting name on edit
export const setName = (name) => {
  return {
    type: SET_NAME,
    name
  }
}

export function setNameThunk(id) {
  return function thunk(dispatch) {
    axios.get(`/api/users/${id}`)
      .then(res => res.data)
      .then(user => {
        const action = setName(user.name)
        store.dispatch(action)
      })
  }
}

// updating user
export const updateUser = (user, users) => {
  return {
    type: UPDATE_USER,
    user,
    users
  }
}

export function updateUserThunk(id, name) {
  return function thunk(dispatch) {
    axios.put(`/api/users/${id}`, ({ name }))
      .then(res => res.data)
      .then(user => {
        const users = store.getState().users.filter(u => u.id !== user.id)
        const action = updateUser(user, users)
        store.dispatch(action)
      })
      .then(() => location.hash = '/')
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

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

export default store;
