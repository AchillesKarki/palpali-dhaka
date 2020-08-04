import React from 'react';
import { withRouter } from 'react-router-dom';

import './checkout-item.scss';
import { connect } from 'react-redux';

import { addCartItem, removeCartItem, clearCartItem } from '../../redux/cart/cart.action';

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
          <span className='name'>{cartItem.name}</span>
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
  addCartItem: (item) => dispatch(addCartItem(item)),
  removeCartItem: (item) => dispatch(removeCartItem(item)),
  clearCartItem: (cartItem) => dispatch(clearCartItem(cartItem)),
});

export default withRouter(connect(null, mapDispatchToProps)(CheckoutItem));