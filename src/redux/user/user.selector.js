import { createSelector } from 'reselect';

const UserSelector = (state) => state.user;

export const selectCurrentUser = createSelector(UserSelector, (user) => user.currentUser);

export const selectToggleUser = createSelector(UserSelector, (user) => user.toggleUser);
