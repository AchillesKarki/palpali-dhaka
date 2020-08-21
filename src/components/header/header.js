import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DropdownUser from '../dropdown-user/dropdown-user';
import DropdownCart from '../dropdown-cart/dropdown-cart';

import { toggleUserDropdown, signOutStartAsync } from '../../redux/user/user.action';
import { selectCurrentUser, selectToggleUser } from '../../redux/user/user.selector';
import { toggleCartDropdown, closeCartDropdown } from '../../redux/cart/cart.action';
import { selectToggleCart, selectTotalCartItems } from '../../redux/cart/cart.selector';

import './header.scss';
import { ReactComponent as Logo } from '../../assets/icons/crown.svg';
import { ReactComponent as UserLogo } from '../../assets/icons/user.svg';
import { ReactComponent as CartLogo } from '../../assets/icons/shopping-cart.svg';

const Header = ({
  currentUser,
  totalCartItems,
  toggleUser,
  toggleCart,
  toggleUserDropdown,
  toggleCartDropdown,
  signOutStartAsync,
}) => {
  /**
   * handles the sign out functionality by calling the sign out action
   */
  const handleLogout = async () => {
    await signOutStartAsync();
  };

  return (
    <div className='header'>
      <NavLink className='brand-logo-container' to='/'>
        <Logo className='brand-logo' />
      </NavLink>
      <nav className='nav'>
        <div className='nav-items'>
          <NavLink className='nav-item-link' exact to='/' activeClassName='active'>
            HOME
          </NavLink>
        </div>
        <div className='nav-items'>
          <NavLink className='nav-item-link' to='/shop/hats' activeClassName='active'>
            SHOP
          </NavLink>
        </div>
        <div className='nav-items'>
          <NavLink className='nav-item-link' to='/contact' activeClassName='active'>
            CONTACT
          </NavLink>
        </div>
        {currentUser ? (
          <div className='nav-items'>
            <div
              className={`${toggleUser ? 'active' : null} nav-item-link user-info-wrapper user-dropdown-trigger`}
              onClick={toggleUserDropdown}
            >
              <UserLogo className='user-logo user-dropdown-trigger' />
              <span className='user-label user-dropdown-trigger'>{currentUser.username}</span>
            </div>
            {toggleUser && <DropdownUser handleLogout={handleLogout} />}
          </div>
        ) : (
          <div className='nav-items'>
            <NavLink className='nav-item-link' to='/auth/sign-in'>
              SIGN IN
            </NavLink>
          </div>
        )}
        <div className='nav-items'>
          <div
            className={`${toggleCart ? 'active' : null} nav-item-link cart-info-wrapper cart-dropdown-trigger`}
            onClick={toggleCartDropdown}
          >
            <CartLogo className='cart-logo cart-dropdown-trigger' />
            <span className='cart-price cart-dropdown-trigger'>{totalCartItems}</span>
          </div>
          {toggleCart && <DropdownCart />}
        </div>
      </nav>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  toggleUser: selectToggleUser,
  toggleCart: selectToggleCart,
  totalCartItems: selectTotalCartItems,
});

const mapDispatchToProps = (dispatch) => ({
  toggleUserDropdown: () => dispatch(toggleUserDropdown()),
  toggleCartDropdown: () => dispatch(toggleCartDropdown()),
  closeCartDropdown: () => dispatch(closeCartDropdown()),
  signOutStartAsync: () => dispatch(signOutStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
