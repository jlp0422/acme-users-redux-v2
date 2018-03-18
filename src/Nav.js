import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  const slash = location.hash
  return (
    <div style={{ margin: '10px 0px 20px' }}>
      <ul className="nav nav-pills">
        {
          slash === '#/' ? (
            <span className="active nav-item nav-link" >Users</span>
          ) : (
          <Link className="nav-link" to='/'>
            <li className="nav-item">Users</li>
          </Link>
          )
        }
        {
          slash === '#/users/create' ? (
            <span className="active nav-item nav-link" >Create User</span>
          ) : (
          <Link className="nav-link" to='/users/create'>
          <li className="nav-item">Create User</li>
        </Link>
          )
        }
        {
          slash === '#/products' ? (
            <span className="active nav-item nav-link" >Products</span>
          ) : (
           <Link className="nav-link" to='/products'>
          <li className="nav-item">Products</li>
        </Link>
          )
        }
      </ul>
    </div>
  )
}

export default Nav;
