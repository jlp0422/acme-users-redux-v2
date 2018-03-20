/* eslint-disable */
import React from 'react';
import axios from 'axios';
import store, { setNameThunk, changeName, updateUserThunk } from './store';

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
    store.dispatch(setNameThunk(userId))
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
    const id = location.hash.split('/')[2]
    const { name } = this.state
    store.dispatch(updateUserThunk(id, name))
  }

  render() {
    console.log(this.state)
    const { onSave, onChange } = this
    const { name } = this.state
    return (
      <div>
        <h2>Edit user</h2>
        <form className="form-group" onSubmit={ onSave }>
          <input className="form-control" value={ name } onChange={ onChange }/>
          <button style={{ marginTop: 20 }} className="btn btn-success">Save</button>
        </form>
      </div>
    )
  }
}
