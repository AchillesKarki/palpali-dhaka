import React, { Component } from 'react';

import errorImage from '../../assets/images/error.png';

import './error-boundary.scss';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {}

  render() {
    if (this.state.hasError) {
      return (
        <div className='error-boundary-wrapper'>
          <img src={errorImage} alt='Error' className='error-image' />
          <p className='error-text'>
            Something went wrong. <span className='try-again-text'>Shall we try again?!</span>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
