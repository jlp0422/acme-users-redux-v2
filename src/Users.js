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

  onDelete(ev, id) {
    ev.preventDefault()
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
              <Link key={ user.id } className="users" to={`/users/${user.id}`}>
              <li style={{ fontSize: 20 }} className="list-group-item users" key={user.id}>
              {user.name}
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-secondary" onClick={(ev) => onDelete(ev, user.id)}>Delete</button>
              </li>
              </Link>
              ))
            }
        </ul>
      </div>
    )
  }

}
