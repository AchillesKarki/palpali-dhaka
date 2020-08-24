import { createSelector } from 'reselect';

const UserSelector = (state) => state.user;

export const selectCurrentUser = createSelector(UserSelector, (user) => user.currentUser);

export const selectToggleUser = createSelector(UserSelector, (user) => user.toggleUser);

export const selectIsUserLoading = createSelector(UserSelector, (user) => user.isUserLoading);

export const selectSuccessMessage = createSelector(UserSelector, (user) => user.successMessage);

export const selectErrorMessage = createSelector(UserSelector, (user) => user.errorMessage);

export const selectCloseUserModal = createSelector(UserSelector, (user) => user.closeUserModal);
