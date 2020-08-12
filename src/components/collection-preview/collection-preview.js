import React from 'react';

import './collection-preview.scss';

import CollectionItem from '../collection-item/collection-item';
import Loader from '../loader/loader';

const CollectionPreview = ({ products, isLoading }) => {
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export default CollectionPreview;
