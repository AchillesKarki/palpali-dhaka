import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

import './header.scss';
import { ReactComponent as Logo } from '../../assets/icons/crown.svg';
import { ReactComponent as UserLogo } from '../../assets/icons/user.svg';

const Header = (props) => {
  const handleLogout = async () => {
    await auth.signOut();
    props.history.push('/auth/sign-in');
  };

  return (
    <div className='header'>
      <Link className='logo-container' to='/'>
        <Logo className='brand-logo' />
      </Link>
      <nav className='nav'>
        <Link className='nav-items' to='/shop'>
          SHOP
        </Link>
        <Link className='nav-items' to='/contact'>
          CONTACT
        </Link>
        {props.currentUser ? (
          <div className='nav-items'>
            <div className='dropdown'>
              <div className='drop-btn'>
                <UserLogo className='user-logo' />
                <span className='drop-label'>{props.currentUser.username}</span>
              </div>
              <div className='dropdown-content'>
                <div className='dropdown-content-item'>My Profile</div>
                <div className='dropdown-content-item' onClick={handleLogout}>
                  Sign Out
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link className='nav-items' to='/auth/sign-in'>
            SIGN IN
          </Link>
        )}
      </nav>
    </div>
  );
};

export default withRouter(Header);
