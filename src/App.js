/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import store, { getAllUsers } from './store'
import Nav from './Nav';
import Users from './Users';
import UserCreate from './UserCreate'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    axios.get('/api/users')
      .then(res => res.data)
      .then(users => {
        const action = getAllUsers(users)
        store.dispatch(action)
      })
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()))
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Route path='/' exact component={ Users } />
          <Route path='/users/create' exact component={ UserCreate } />
        </div>
      </Router>

    )
  }
}

// export default App
