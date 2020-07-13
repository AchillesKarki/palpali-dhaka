import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/home-page/home-page';
import ShopPage from './pages/shop-page/shop-page';
import AuthPage from './pages/auth-page/auth-page';

import Header from './components/header/header';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  firebaseAuthUnsubscribe = null;

  componentDidMount() {
    this.firebaseAuthUnsubscribe = auth.onAuthStateChanged(async (userInfo) => {
      if (userInfo) {
        try {
          const userRef = await createUserProfileDocument(userInfo);

          userRef.onSnapshot((snapshot) => {
            this.setState({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data(),
              },
            });
          });
        } catch (error) {}
      } else {
        this.setState({ currentUser: userInfo });
      }
    });
  }

  componentWillUnmount() {
    this.firebaseAuthUnsubscribe();
  }

  render() {
    return (
      <>
        <Header currentUser={this.state.currentUser} />
        <div className='main-content-wrapper'>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/auth/:mode' component={AuthPage} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
