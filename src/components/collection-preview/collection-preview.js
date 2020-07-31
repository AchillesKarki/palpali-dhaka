import React from 'react';

import './collection-preview.scss';

import CollectionItem from '../collection-item/collection-item';

const CollectionPreview = ({ title, items }) => {
  return (
    <div className='collection-preview'>
      <h1 className='title'>{title.toUpperCase()}</h1>
      {items.length ? (
        <div className='preview'>
          {items.map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className='empty-message'>There are no items for the selected filter.</div>
      )}
    </div>
  );
};

export default CollectionPreview;
