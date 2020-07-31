import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  toggleUser: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
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

    default:
      return state;
  }
};

export default userReducer;
