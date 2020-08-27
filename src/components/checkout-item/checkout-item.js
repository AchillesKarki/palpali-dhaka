import React, { memo } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { addCartItemStartAsync, removeCartItemStartAsync, clearCartItemStartAsync } from '../../redux/cart/cart.action';

import { isEquivalent } from '../../utility/helper-utils';
import StarRatings from '../star-ratings/star-ratings';
import './checkout-item.scss';

const CheckoutItem = ({ cartItem, addCartItem, removeCartItem, clearCartItem, history }) => {
  /**
   * handles the click event on item
   */
  const handleItemClick = () => {
    history.push(`/product-detail/${cartItem.id}`);
  };

  return (
    <tr className='checkout-item'>
      <td className='table-body-cell column1'>
        <div className='product-item' title='View Product Details' onClick={handleItemClick}>
          <img src={cartItem.imageUrl} alt={cartItem.name} />
          <div className='name-and-rating'>
            <span className='name'>{cartItem.name}</span>
            <div className='rating'>
              <StarRatings ratings={cartItem.rating} />
            </div>
          </div>
        </div>
      </td>
      <td className='table-body-cell column2'>
        <div className=' product-quantity'>
          <span className='arrow' onClick={() => removeCartItem(cartItem)}>
            &#10094;
          </span>
          <span className='quantity'>{cartItem.quantity}</span>
          <span className='arrow' onClick={() => addCartItem(cartItem)}>
            &#10095;
          </span>
        </div>
      </td>
      <td className='table-body-cell column3'>
        <span className='price'>${cartItem.price}</span>
      </td>
      <td className='table-body-cell column4'>
        <span className='remove-button' onClick={() => clearCartItem(cartItem)}>
          &#10005;
        </span>
      </td>
    </tr>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItemStartAsync(item)),
  removeCartItem: (item) => dispatch(removeCartItemStartAsync(item)),
  clearCartItem: (cartItem) => dispatch(clearCartItemStartAsync(cartItem)),
});

const areEqual = (prevProps, nextProps) => {
  return isEquivalent(prevProps.cartItem, nextProps.cartItem);
};

export default withRouter(connect(null, mapDispatchToProps)(memo(CheckoutItem, areEqual)));
