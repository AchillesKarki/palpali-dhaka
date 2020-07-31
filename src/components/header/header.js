import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import DropdownUser from '../dropdown-user/dropdown-user';
import DropdownCart from '../dropdown-cart/dropdown-cart';

import { toggleUserDropdown } from '../../redux/user/user.action';
import { selectCurrentUser, selectToggleUser } from '../../redux/user/user.selector';
import { toggleChartDropdown, closeCartDropdown } from '../../redux/cart/cart.action';
import { selectToggleCart, selectTotalCartItems } from '../../redux/cart/cart.selector';

import './header.scss';
import { ReactComponent as Logo } from '../../assets/icons/crown.svg';
import { ReactComponent as UserLogo } from '../../assets/icons/user.svg';
import { ReactComponent as CartLogo } from '../../assets/icons/shopping-cart.svg';

const Header = (props) => {
  const handleLogout = async () => {
    await auth.signOut();
    props.history.push('/auth/sign-in');
  };

  return (
    <div className='header'>
      <NavLink className='brand-logo-container' to='/'>
        <Logo className='brand-logo' />
      </NavLink>
      <nav className='nav'>
        <div className='nav-items'>
          <NavLink className='nav-item-link' to='/shop/popular' activeClassName='active'>
            SHOP
          </NavLink>
        </div>
        <div className='nav-items'>
          <NavLink className='nav-item-link' to='/contact' activeClassName='active'>
            CONTACT
          </NavLink>
        </div>
        {props.currentUser ? (
          <div className='nav-items'>
            <div
              className={`${props.toggleUser ? 'active' : null} nav-item-link user-info-wrapper user-dropdown-trigger`}
              onClick={props.toggleUserDropdown}
            >
              <UserLogo className='user-logo user-dropdown-trigger' />
              <span className='user-label user-dropdown-trigger'>{props.currentUser.username}</span>
            </div>
            {props.toggleUser && <DropdownUser handleLogout={handleLogout} />}
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
            className={`${props.toggleCart ? 'active' : null} nav-item-link cart-info-wrapper cart-dropdown-trigger`}
            onClick={props.toggleChartDropdown}
          >
            <CartLogo className='cart-logo cart-dropdown-trigger' />
            <span className='cart-price cart-dropdown-trigger'>{props.totalCartItems}</span>
          </div>
          {props.toggleCart && <DropdownCart />}
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
  toggleChartDropdown: () => dispatch(toggleChartDropdown()),
  closeCartDropdown: () => dispatch(closeCartDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
