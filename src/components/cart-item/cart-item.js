import React from 'react';
import { withRouter } from 'react-router-dom';

import StarRatings from '../star-ratings/star-ratings';
import './cart-item.scss';

const CartItem = ({ cartItem, history }) => {
  /**
   * handles the click event on item
   */
  const handleItemClick = () => {
    history.push(`/product-detail/${cartItem.id}`);
  };

  return (
    <div className='cart-item' title='View Product Details' onClick={handleItemClick}>
      <img src={cartItem.imageUrl} alt={cartItem.name} />
      <div className='item-details'>
        <span className='name'>{cartItem.name}</span>
        <div className='price-and-rating'>
          <span className='price'>
            {cartItem.quantity} x ${cartItem.price}
          </span>
          <div className='rating'>
            <StarRatings ratings={cartItem.rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CartItem);
