import React from 'react';

import ProductsTab from '../../components/products-tab/products-tab';

const ShopPage = ({ match }) => {
  return (
    <div className='shop-page'>
      <ProductsTab product={match.params.product} />
    </div>
  );
};

export default ShopPage;
