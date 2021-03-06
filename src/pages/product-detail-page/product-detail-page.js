import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsShopLoading, selectNewShopProducts, selectSingleShopProduct } from '../../redux/shop/shop.selector';
import { fetchSingleProductStartAsync, fetchProductsStartAsync } from '../../redux/shop/shop.action';
import { addCartItemStartAsync, clearMessage } from '../../redux/cart/cart.action';
import { selectIsCartLoading, selectCartErrorMessage } from '../../redux/cart/cart.selector';

import withSpinner from '../../hoc/withSpinner/with-spinner';
import withAlert from '../../hoc/withAlert/withAlert';
import StarRatings from '../../components/star-ratings/star-ratings';
import './product-detail-page.scss';

const ProductDetailPage = ({
  singleProduct,
  products,
  getSingleProduct,
  getShopProducts,
  addCartItem,
  history,
  match: {
    params: { productId },
  },
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    getSingleProduct(productId);
  }, [productId, getSingleProduct]);

  useEffect(() => {
    if (!products.length) {
      getShopProducts();
    }
  }, [products.length, getShopProducts]);

  /**
   * handles the click event on item
   */
  const handleItemClick = (cartItemId) => {
    history.push(`/product-detail/${cartItemId}`);
  };

  return (
    <div>
      <section id='detail-section' className='detail-section'>
        <div className='container'>
          {singleProduct && (
            <div className='detail-holder'>
              <div className='image-holder' style={{ backgroundImage: `url(${singleProduct.imageUrl})` }}></div>
              <div className='text-holder'>
                <h2>{singleProduct.name}</h2>
                <span className='price'>
                  $ {singleProduct.price} <StarRatings ratings={singleProduct.rating} />
                </span>
                <div className='detail'>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla repellendus unde consequatur iure
                    quaerat ut, sint pariatur totam culpa molestiae ducimus odio? Magni quaerat, fuga quam provident
                    pariatur, ducimus quasi.
                  </p>
                </div>
                <button className='btn btn-primary btn-medium' onClick={() => addCartItem(singleProduct)}>
                  add to cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className='new-arrivals'>
        <div className='container'>
          <div className='tab-section'>
            <h1 className='text-center'>Products you may like</h1>
            {products.length ? (
              <div className='tab-content'>
                {products.map((product) => (
                  <div key={product.id} className='content-wrap'>
                    <div className='image-holder'>
                      <div className='inner'>
                        <div className='image' style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
                        <button className='btn btn-primary btn-medium' onClick={() => handleItemClick(product.id)}>
                          Shop now
                        </button>
                      </div>
                    </div>
                    <div className='detail-holder'>
                      <span className='name'>{product.name}</span>
                      <span className='price'>$ {product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  singleProduct: selectSingleShopProduct,
  products: selectNewShopProducts,
  cartErrorMessage: selectCartErrorMessage,
  isShopLoading: selectIsShopLoading,
  isCartLoading: selectIsCartLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (productId) => dispatch(fetchSingleProductStartAsync(productId)),
  getShopProducts: () => dispatch(fetchProductsStartAsync(null, 'newArrival')),
  addCartItem: (product) => dispatch(addCartItemStartAsync(product)),
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withSpinner(withAlert(ProductDetailPage)));
