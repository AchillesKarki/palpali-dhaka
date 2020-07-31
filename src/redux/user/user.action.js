import { UserActionTypes } from './user.types';

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const closeUserDropdown = () => ({
  type: UserActionTypes.CLOSE_USER_DROPDOWN,
});

export const toggleUserDropdown = () => ({
  type: UserActionTypes.TOGGLE_USER_DROPDOWN,
});
