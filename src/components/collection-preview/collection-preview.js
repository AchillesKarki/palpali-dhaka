import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartErrorMessage } from '../../redux/cart/cart.selector';
import { clearMessage } from '../../redux/cart/cart.action';

import withAlert from '../../hoc/withAlert/withAlert';
import CollectionItem from '../collection-item/collection-item';
import './collection-preview.scss';

const CollectionPreview = ({ products }) => {
  return (
    <div className='collection-preview'>
      {products.length ? (
        <div className='preview'>
          {products.map((item) => (
            <CollectionItem key={item.id} cartItem={item} />
          ))}
        </div>
      ) : (
        <div className='empty-message'>There are no items for the selected filter.</div>
      )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartErrorMessage: selectCartErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withAlert(CollectionPreview));
