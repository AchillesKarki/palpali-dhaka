import React from 'react';

import './collection-preview.scss';

import CollectionItem from '../collection-item/collection-item';

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

export default CollectionPreview;
