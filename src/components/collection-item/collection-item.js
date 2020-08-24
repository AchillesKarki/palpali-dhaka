import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { addCartItemStartAsync, clearMessage } from '../../redux/cart/cart.action';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { selectErrorMessage } from '../../redux/cart/cart.selector';

import withAlert from '../../hoc/withAlert/withAlert';
import StarRatings from '../star-ratings/star-ratings';
import './collection-item.scss';

const CollectionItem = ({ currentUser, cartItem, addCartItem, history }) => {
  const { id, name, price, imageUrl } = cartItem;

  /**
   * handles the click event on item
   */
  const handleItemClick = () => {
    history.push(`/product-detail/${id}`);
  };

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
        <div className='price-and-rating'>
          <span className='price'>${price}</span>
          <div className='rating'>
            <StarRatings ratings={cartItem.rating} />
          </div>
        </div>
      </div>
      <div className='collection-actions'>
        <button type='button' className='btn btn-secondary btn-small' onClick={handleItemClick}>
          Product Details
        </button>
        <button
          title={currentUser ? null : 'Please sign in to use the cart!'}
          disabled={!currentUser}
          type='button'
          className='btn btn-primary btn-small'
          onClick={() => addCartItem(cartItem)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  errorMessage: selectErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (item) => dispatch(addCartItemStartAsync(item)),
  clearMessage: () => dispatch(clearMessage()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withAlert(CollectionItem)));
