import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <ul>
        <Link to='/'>
          <li>Users</li>
        </Link>
        <Link to='/users/create'>
          <li>Create User</li>
        </Link>
        <Link to='/products'>
          <li>Products</li>
        </Link>
      </ul>
    </div>
  )
}

export default Nav;
