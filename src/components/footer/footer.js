import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selector';

const Footer = ({ currentUser }) => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='copyright'>
          <span>Copyright ©{new Date().getFullYear()} Palpali Dhaka</span>
        </div>
        <ul className='footer-nav'>
          <Link className='list-items' to='/'>
            Home
          </Link>
          <Link className='list-items' to='/shop/hats'>
            Products
          </Link>
          <Link className='list-items' to='/contact'>
            Contact
          </Link>
          {!currentUser && (
            <Link className='list-items' to='auth/sign-in'>
              Sign In
            </Link>
          )}
        </ul>
      </div>
    </footer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Footer);
