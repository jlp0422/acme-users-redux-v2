/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import store, { deleteUserThunk } from './store';

export default class Users extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  onDelete(id) {
    store.dispatch(deleteUserThunk(id))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    const { onDelete } = this
    const { users } = this.state
    return (
      <div>
        <h2>We have { users.length } users</h2>
        <ul className="list-group" >
          {
            users.map(user => (
              <li style={{ fontSize: 20 }}className="list-group-item" key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-danger" onClick={() => onDelete(user.id)}>Delete</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }

}
