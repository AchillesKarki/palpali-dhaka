import React from 'react';
import { withRouter } from 'react-router-dom';

const DropdownUser = ({ handleLogout, history }) => {
  /**
   * handles the click event on my profile
   */
  const handleProfileClick = () => {
    history.push('/profile/me');
  };

  /**
   * handles the click event on my orders
   */
  const handleOrdersClick = () => {
    history.push('/profile/orders');
  };

  return (
    <div className='dropdown'>
      <div className='dropdown-items-wrapper'>
        <div className='dropdown-item' onClick={handleProfileClick}>
          My Profile
        </div>
        <div className='dropdown-item' onClick={handleOrdersClick}>
          My Orders
        </div>
        <div className='dropdown-item' onClick={handleLogout}>
          Sign Out
        </div>
      </div>
    </div>
  );
};

export default withRouter(DropdownUser);
