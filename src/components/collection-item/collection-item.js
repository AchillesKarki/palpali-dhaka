import React from 'react';
import { connect } from 'react-redux';

import { addCartItem } from '../../redux/cart/cart.action';

import './collection-item.scss';

const CollectionItem = ({ item, addCartItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <div className='collection-item'>
      <div
        className='image'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${price}</span>
      </div>
      <div className='collection-actions'>
        <button type='button' className='btn btn-secondary btn-small'>
          Product Details
        </button>
        <button type='button' className='btn btn-primary btn-small' onClick={() => addCartItem(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
