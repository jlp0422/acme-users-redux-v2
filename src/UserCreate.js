/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
import store from './store';

export default class UserCreate extends React.Component {
  constructor() {
    super()
    this.state = store.getState()
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState(store.getState())
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    console.log(this.state)
    return (
      <hr />
    )
  }
}
