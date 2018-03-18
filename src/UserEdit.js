/* eslint-disable */
import React from 'react';
import axios from 'axios';
import store, { setName, changeName, updateUser } from './store';

export default class UserEdit extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onSave = this.onSave.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(()=> this.setState(store.getState()))
    const userId = location.hash.split('/')[2]
    axios.get(`/api/users/${userId}`)
      .then( res => res.data)
      .then( user => {
        const action = setName(user.name)
        store.dispatch(action)
      })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  onChange(ev) {
    const action = changeName(ev.target.value)
    store.dispatch(action)
  }

  onSave(ev) {
    ev.preventDefault()
    const userId = location.hash.split('/')[2]
    const { name } = this.state
    axios.put(`/api/users/${userId}`, ({ name }))
      .then( res => res.data)
      .then( user => {
        const users = this.state.users.filter(u => u.id !== user.id)
        const action = updateUser(user, users)
        store.dispatch(action)
      })
      .then(() => location.hash = '/')
  }

  render() {
    const { onSave, onChange } = this
    const { name } = this.state
    return (
      <div>
        <form onSubmit={ onSave }>
          <input value={ name } onChange={ onChange }/>
          <button>Save</button>
        </form>
      </div>
    )
  }
}
