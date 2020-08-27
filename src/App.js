import React, { Component, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { asyncUserRequestSuccess, asyncUserRequestFailure } from './redux/user/user.action';
import { fetchCartItemsStartAsync } from './redux/cart/cart.action';
import { selectCurrentUser } from './redux/user/user.selector';

import { auth } from './firebase/firebase.utils';
import { createUserProfileDocument } from './utility/user-utils';

import Header from './components/header/header';
import Footer from './components/footer/footer';
import Loader from './components/loader/loader';
import ErrorBoundary from './components/error-boundary/error-boundary';

const HomePage = lazy(() => import('./pages/home-page/home-page'));
const ShopPage = lazy(() => import('./pages/shop-page/shop-page'));
const CheckoutPage = lazy(() => import('./pages/checkout-page/checkout-page'));
const ProfilePage = lazy(() => import('./pages/profile-page/profile-page'));
const ContactPage = lazy(() => import('./pages/contact-page/contact-page'));
const ProductDetailPage = lazy(() => import('./pages/product-detail-page/product-detail-page'));
const AuthPage = lazy(() => import('./pages/auth-page/auth-page'));

export class App extends Component {
  firebaseAuthUnsubscribe = null;

  componentDidMount() {
    this.firebaseAuthUnsubscribe = auth.onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        try {
          const currentUser = await createUserProfileDocument(userInfo);
          this.props.setCurrentUser(currentUser);
          this.props.fetchCartItemsStartAsync();
        } catch (error) {
          this.props.setUserErrorMessage(error.message);
        }
      } else {
        this.props.setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.firebaseAuthUnsubscribe();
  }

  render() {
    return (
      <>
        <Header />
        <ErrorBoundary>
          <div className='main-content-wrapper'>
            <Switch>
              <Suspense fallback={<Loader />}>
                <Route exact path='/' component={HomePage} />
                <Route exact path='/shop/:product' component={ShopPage} />
                <Route exact path='/contact' component={ContactPage} />
                <Route exact path='/product-detail/:productId' component={ProductDetailPage} />
                <Route
                  exact
                  path='/profile/:entity'
                  render={() => (this.props.currentUser ? <ProfilePage /> : <Redirect to='/auth/sign-in' />)}
                />
                <Route
                  exact
                  path='/checkout'
                  render={() => (this.props.currentUser ? <CheckoutPage /> : <Redirect to='/auth/sign-in' />)}
                />
                <Route
                  exact
                  path='/auth/:mode'
                  render={() => (this.props.currentUser ? <Redirect to='/' /> : <AuthPage />)}
                />
              </Suspense>
            </Switch>
          </div>
        </ErrorBoundary>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (currentUser) => dispatch(asyncUserRequestSuccess(currentUser)),
  setUserErrorMessage: (errorMessage) => dispatch(asyncUserRequestFailure(errorMessage)),
  fetchCartItemsStartAsync: () => dispatch(fetchCartItemsStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
