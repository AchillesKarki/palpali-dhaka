import {
  firebaseSignupWithEmailAndPassword,
  firebaseSignInWithEmailAndPassword,
  firebaseSignInWithGoogle,
  firebaseResetPassword,
  firebaseSignOut,
  firebaseUpdateProfile,
  firebaseChangePassword,
} from '../../utility/user-utils';

import { UserActionTypes } from './user.types';
import { clearWholeCart } from '../cart/cart.action';

export const closeUserDropdown = () => ({
  type: UserActionTypes.CLOSE_USER_DROPDOWN,
});

export const toggleUserDropdown = () => ({
  type: UserActionTypes.TOGGLE_USER_DROPDOWN,
});

export const setSuccessMessage = (successMessage) => ({
  type: UserActionTypes.SET_SUCCESS_MESSAGE,
  payload: successMessage,
});

export const clearMessage = () => ({
  type: UserActionTypes.CLEAR_MESSAGE,
});

export const openUserModal = () => ({
  type: UserActionTypes.OPEN_USER_MODAL,
});

export const closeUserModal = () => ({
  type: UserActionTypes.CLOSE_USER_MODAL,
});

export const asyncUserRequestStart = () => ({
  type: UserActionTypes.ASYNC_USER_REQUEST_START,
});

export const asyncUserRequestSuccess = (currentUser) => ({
  type: UserActionTypes.ASYNC_USER_REQUEST_SUCCESS,
  payload: currentUser,
});

export const asyncUserRequestFailure = (errorMessage) => ({
  type: UserActionTypes.ASYNC_USER_REQUEST_FAILURE,
  payload: errorMessage,
});

export const userSignUpWithEmailAndPasswordStartAsync = (userInfo) => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseSignupWithEmailAndPassword(userInfo);

    if (apiResponse.type === 'success') {
      dispatch(asyncUserRequestSuccess(apiResponse.currentUser));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const userSignInWithEmailAndPasswordStartAsync = (userInfo) => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseSignInWithEmailAndPassword(userInfo);

    if (apiResponse.type === 'success') {
      dispatch(asyncUserRequestSuccess(apiResponse.currentUser));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const userSignInWithGoogleStartAsync = () => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseSignInWithGoogle();

    if (apiResponse.type === 'success') {
      dispatch(asyncUserRequestSuccess(apiResponse.currentUser));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const forgotPasswordStartAsync = (emailAddress) => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseResetPassword(emailAddress);

    if (apiResponse.type === 'success') {
      dispatch(setSuccessMessage(apiResponse.successMessage));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const signOutStartAsync = () => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseSignOut();

    if (apiResponse.type === 'success') {
      dispatch(clearWholeCart());
      dispatch(setSuccessMessage(apiResponse.successMessage));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const updateUserProfileAsync = (updatedUserInfo) => {
  return async (dispatch) => {
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseUpdateProfile(updatedUserInfo);

    if (apiResponse.type === 'success') {
      dispatch(asyncUserRequestSuccess(apiResponse.currentUser));
      dispatch(setSuccessMessage('The details have been set successfully.'));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};

export const changeUserPasswordAsync = (newPassword) => {
  return async (dispatch) => {
    dispatch(openUserModal());
    dispatch(asyncUserRequestStart());
    const apiResponse = await firebaseChangePassword(newPassword);

    if (apiResponse.type === 'success') {
      dispatch(closeUserModal());
      dispatch(setSuccessMessage(apiResponse.successMessage));
    } else {
      dispatch(asyncUserRequestFailure(apiResponse.errorMessage));
    }
  };
};
