import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  isUserLoading: false,
  errorMessage: null,
  successMessage: null,
  toggleUser: false,
  closeUserModal: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_SUCCESS_MESSAGE:
      return {
        ...state,
        isUserLoading: false,
        successMessage: action.payload,
      };

    case UserActionTypes.CLEAR_MESSAGE:
      return {
        ...state,
        successMessage: null,
        errorMessage: null,
      };

    case UserActionTypes.CLOSE_USER_DROPDOWN:
      return {
        ...state,
        toggleUser: false,
      };

    case UserActionTypes.TOGGLE_USER_DROPDOWN:
      return {
        ...state,
        toggleUser: !state.toggleUser,
      };

    case UserActionTypes.OPEN_USER_MODAL:
      return {
        ...state,
        closeUserModal: false,
      };

    case UserActionTypes.CLOSE_USER_MODAL:
      return {
        ...state,
        closeUserModal: true,
      };

    case UserActionTypes.ASYNC_USER_REQUEST_START:
      return {
        ...state,
        isUserLoading: true,
      };

    case UserActionTypes.ASYNC_USER_REQUEST_SUCCESS:
      return {
        ...state,
        isUserLoading: false,
        currentUser: action.payload,
      };

    case UserActionTypes.ASYNC_USER_REQUEST_FAILURE:
      return {
        ...state,
        isUserLoading: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
