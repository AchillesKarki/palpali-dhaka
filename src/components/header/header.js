import React, { useState, useRef, useEffect } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import DropdownUser from '../dropdowns/dropdown-user/dropdown-user';
import DropdownCart from '../dropdowns/dropdown-cart/dropdown-cart';

import { toggleUserDropdown, signOutStartAsync, closeUserDropdown } from '../../redux/user/user.action';
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
  closeUserDropdown,
  closeCartDropdown,
  signOutStartAsync,
  history,
}) => {
  const wrapperRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleCart && !event.target.matches(['.cart-dropdown-trigger', 'path'])) {
        closeCartDropdown();
      }

      if (toggleUser && !event.target.matches('.user-dropdown-trigger')) {
        closeUserDropdown();
      }

      if (wrapperRef.current && !wrapperRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };

    // used to close the responsive nav menu when a route changes
    history.listen(() => setMenuOpen(false));

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [history, menuOpen, toggleUser, toggleCart, closeUserDropdown, closeCartDropdown]);

  /**
   * handles the menu icon click
   */
  const handleMenuCLick = () => {
    setMenuOpen(!menuOpen);
  };

  /**
   * handles the sign out functionality by calling the sign out action
   */
  const handleLogout = async () => {
    await signOutStartAsync();
    history.push('/');
  };

  return (
    <div className='header'>
      <NavLink className='brand-logo-container' to='/'>
        <Logo className='brand-logo' />
      </NavLink>
      <div className='navbar-icons' onClick={handleMenuCLick}>
        {menuOpen ? (
          <div className='icon-wrap'>
            <span className='icons icon-clear'></span>
          </div>
        ) : (
          <div className='icon-wrap'>
            <span className='icons icon-menu'></span>
          </div>
        )}
      </div>
      <nav ref={wrapperRef} className={`nav ${menuOpen ? 'responsive-nav' : ''}`}>
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
              className={`${toggleUser ? 'active' : ''} nav-item-link user-info-wrapper user-dropdown-trigger`}
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
            className={`${toggleCart ? 'active' : ''} nav-item-link cart-info-wrapper cart-dropdown-trigger`}
            onClick={toggleCartDropdown}
          >
            <CartLogo className='cart-logo cart-dropdown-trigger' />
            <span className='cart-price cart-dropdown-trigger'>{totalCartItems}</span>
            <span className='cart-text cart-dropdown-trigger'>Cart</span>
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
  closeUserDropdown: () => dispatch(closeUserDropdown()),
  signOutStartAsync: () => dispatch(signOutStartAsync()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
