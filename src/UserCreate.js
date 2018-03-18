/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import store, { changeName, createUserThunk } from './store';
import axios from 'axios'

export default class UserCreate extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onChange = this.onChange.bind(this)
    this.onCreateUser = this.onCreateUser.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onChange(ev) {
    const action = changeName(ev.target.value)
    store.dispatch(action)
  }

  onCreateUser(ev) {
    ev.preventDefault()
    const name = this.state.name
    store.dispatch(createUserThunk(name))
  }

  render() {
    const { onChange, onCreateUser } = this
    return (
      <div>
        <h2>Create a user</h2>
        <form className="form-group" onSubmit={ onCreateUser }>
          <input className="form-control" onChange={ onChange }/>
          <button className="btn btn-outline-success" style={{ marginTop: 20 }}>Create user</button>
        </form>
      </div>
    )
  }
}
