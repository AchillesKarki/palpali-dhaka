import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser, closeUserDropdown } from './redux/user/user.action';
import { closeCartDropdown } from './redux/cart/cart.action';
import { selectCurrentUser, selectToggleUser } from './redux/user/user.selector';
import { selectToggleCart } from './redux/cart/cart.selector';

import HomePage from './pages/home-page/home-page';
import ShopPage from './pages/shop-page/shop-page';
import CheckoutPage from './pages/checkout-page/checkout-page';
import ProfilePage from './pages/profile-page/profile-page';
import ContactPage from './pages/contact-page/contact-page';
import ProductDetailPage from './pages/product-detail-page/product-detail-page';
import AuthPage from './pages/auth-page/auth-page';

import Header from './components/header/header';

export class App extends Component {
  firebaseAuthUnsubscribe = null;

  componentDidMount() {
    this.firebaseAuthUnsubscribe = auth.onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        try {
          const userRef = await createUserProfileDocument(userInfo);

          userRef.onSnapshot((snapshot) => {
            this.props.setCurrentUser({
              id: snapshot.id,
              ...snapshot.data(),
            });
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.props.setCurrentUser(userInfo);
      }
    });

    // Close the dropdown if the user clicks outside of it
    window.onclick = (event) => {
      if (this.props.toggleCart && !event.target.matches(['.cart-dropdown-trigger', 'path'])) {
        this.props.closeCartDropdown();
      }

      if (this.props.toggleUser && !event.target.matches('.user-dropdown-trigger')) {
        this.props.closeUserDropdown();
      }
    };
  }

  componentWillUnmount() {
    this.firebaseAuthUnsubscribe();
  }

  render() {
    return (
      <>
        <Header />
        <div className='main-content-wrapper'>
          <Switch>
            <Route exact path='/shop/:product' component={ShopPage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/contact' component={ContactPage} />
            <Route exact path='/product-detail/:productId' component={ProductDetailPage} />
            <Route
              exact
              path='/auth/:mode'
              render={() => (this.props.currentUser ? <Redirect to='/' /> : <AuthPage />)}
            />
          </Switch>
          <Route exact path='/' component={HomePage} />
        </div>
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  toggleUser: selectToggleUser,
  toggleCart: selectToggleCart,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  closeCartDropdown: () => dispatch(closeCartDropdown()),
  closeUserDropdown: () => dispatch(closeUserDropdown()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
