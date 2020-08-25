import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectIsShopLoading, selectNewShopProducts } from '../../redux/shop/shop.selector';

import withSpinner from '../../hoc/withSpinner/with-spinner';
import bannerImage from '../../assets/images/banner-bg02.jpg';
import heroImage from '../../assets/images/img07.jpg';

import './home-page.scss';

const Homepage = ({ products, history }) => {
  /**
   * navigates to the shop page
   * @param {String} routeParam the shop route param to navigate to
   */
  const navigateToShop = (routeParam) => {
    history.push(`/shop/${routeParam}`);
  };

  /**
   * handles the click event on item
   */
  const handleItemClick = (cartItemId) => {
    history.push(`/product-detail/${cartItemId}`);
  };

  return (
    <main className='main homepage'>
      <section
        className='banner'
        style={{
          backgroundImage: `url(${bannerImage})`,
        }}
      >
        <div className='container'>
          <div className='banner-content-hold'>
            <div className='image-wrapper' style={{ backgroundImage: `url(${heroImage})` }}></div>
            <div className='text-wrapper'>
              <div className='holder'>
                <span className='sub-heading'>Shopping Is Fun</span>
                <h1>
                  browse our <br /> dhaka products
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis aliquam reiciendis facilis deleniti,
                  ratione perspiciatis unde exercitationem maiores magnam blanditiis. Fugiat dolorem doloribus molestias
                  nulla consequatur officiis inventore harum perspiciatis.
                </p>
                <button className='btn btn-primary btn-small' onClick={() => navigateToShop('hats')}>
                  Browse now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='features'>
        <div className='features-container'>
          <div className='feature-list'>
            <div className='list'>
              <div className='list-content'>
                <div className='icon-wrap'>
                  <span className='icon-truck'></span>
                </div>
                <h5>free delivery</h5>
                <p> Free Delivery on Orders Above $50</p>
              </div>
            </div>
            <div className='list'>
              <div className='list-content'>
                <div className='icon-wrap'>
                  <span className='icon-return'></span>
                </div>
                <h5>return policy</h5>
                <p> Free Shipping on all orders</p>
              </div>
            </div>
            <div className='list'>
              <div className='list-content'>
                <div className='icon-wrap'>
                  <span className='icon-support'></span>
                </div>
                <h5>24/7 support</h5>
                <p> We Are Here For Your Support</p>
              </div>
            </div>
            <div className='list'>
              <div className='list-content'>
                <div className='icon-wrap'>
                  <span className='icon-money'></span>
                </div>
                <h5>secure payement</h5>
                <p> We Care For Your Security and Protection</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='new-arrivals'>
        <div className='container'>
          <div className='tab-section'>
            <div className='tab-list-wrapper'>
              <h1>New Arrivals</h1>
              <ul className='tablist-02'>
                <li className='active'>
                  <button className='btn btn-secondary btn-small' type='button' onClick={() => navigateToShop('hats')}>
                    Hats
                  </button>
                </li>
                <li>
                  <button className='btn btn-secondary btn-small' type='button' onClick={() => navigateToShop('bags')}>
                    Bags
                  </button>
                </li>
                <li>
                  <button className='btn btn-secondary btn-small' type='button' onClick={() => navigateToShop('shoes')}>
                    Shoes
                  </button>
                </li>
                <li>
                  <button
                    className='btn btn-secondary btn-small'
                    type='button'
                    onClick={() => navigateToShop('womens')}
                  >
                    Womens
                  </button>
                </li>
                <li>
                  <button className='btn btn-secondary btn-small' type='button' onClick={() => navigateToShop('mens')}>
                    Mens
                  </button>
                </li>
              </ul>
            </div>
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
      {products.length && products.filter((product) => product.trending).length ? (
        <section className='trending-section'>
          <div className='container'>
            <div className='heading'>
              <h1>Trending Products</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde maiores impedit nostrum nobis ipsam culpa
              </p>
            </div>
            <div className='image-text-section'>
              {products
                .filter((product) => product.trending)
                .map((product) => (
                  <div key={product.id} className='image-text-holder'>
                    <div className='image-holder' style={{ backgroundImage: `url(${product.imageUrl})` }}></div>
                    <div className='text-holder'>
                      <h1>{product.name}</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam reiciendis omnis aspernatur
                        est odionulla
                      </p>
                      <Link to={`/product-detail/${product.id}`}>
                        <button className='btn btn-primary btn-medium' type='button'>
                          Shop Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : null}
      <section className='subscribe-section'>
        <div className='container'>
          <div className='heading'>
            <h1>Subscribe To Our Newsletter</h1>
          </div>
          <form className='subscribe-form'>
            <div className='form-group'>
              <input type='email' placeholder='ENTER EMAIL ADDRESS' />
              <button type='button' className=' submit-btn'>
                submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  products: selectNewShopProducts,
  isShopLoading: selectIsShopLoading,
});

const areEqual = (prevProps, nextProps) => {
  return JSON.stringify(prevProps.products) === JSON.stringify(nextProps.products);
};

export default connect(mapStateToProps)(withSpinner(memo(Homepage, areEqual)));
