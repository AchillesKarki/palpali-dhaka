import store from '../redux/store';
import { auth, firestore, signInWithGoogle } from '../firebase/firebase.utils';

let CURRENT_USER_ID;

store.subscribe(() => {
  CURRENT_USER_ID = store.getState().user.currentUser?.id;
});

/**
 * implements the firebase sign up functionality
 * @param {Object} param the destructed user info object
 */
export const firebaseSignupWithEmailAndPassword = async ({ email, password, ...additionalUserInfo }) => {
  let response;
  try {
    const userResponse = await auth.createUserWithEmailAndPassword(email, password);
    const currentUser = await createUserProfileDocument(userResponse.user, additionalUserInfo);

    response = { type: 'success', currentUser };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};

/**
 * implements the firebase sign in functionality with email and password
 * @param {Object} param the destructed user info object
 */
export const firebaseSignInWithEmailAndPassword = async ({ email, password }) => {
  let response;

  try {
    const userResponse = await auth.signInWithEmailAndPassword(email, password);
    const currentUser = await createUserProfileDocument(userResponse.user);

    response = { type: 'success', currentUser };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};

/**
 * implements the firebase sign up functionality with google sign-in
 */
export const firebaseSignInWithGoogle = async () => {
  let response;

  try {
    const userResponse = await signInWithGoogle();
    const currentUser = await createUserProfileDocument(userResponse.user);

    response = { type: 'success', currentUser };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};

/**
 * implements the firebase reset password functionality using the email address
 * @param {String} emailAddress the email address
 */
export const firebaseResetPassword = async (emailAddress) => {
  let response;

  try {
    await auth.sendPasswordResetEmail(emailAddress);

    response = {
      type: 'success',
      successMessage: 'A recovery email has been sent to your email address. Please follow up to reset your password.',
    };
  } catch (error) {
    response = { type: 'error', errorMessage: error.message };
  }

  return response;
};

/**
 * implements the firebase sign out functionality
 */
export const firebaseSignOut = async () => {
  if (CURRENT_USER_ID) {
    let response;

    try {
      await auth.signOut();

      response = {
        type: 'success',
        successMessage: null,
      };
    } catch (error) {
      response = { type: 'error', errorMessage: error.message };
    }

    return response;
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the firebase update user functionality
 * @param {Object} updatedUserInfo the updated user info
 */
export const firebaseUpdateProfile = async (updatedUserInfo) => {
  if (CURRENT_USER_ID) {
    let response;

    try {
      const userRef = firestore.doc(`users/${CURRENT_USER_ID}`);

      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        await userRef.update(updatedUserInfo);
        updatedUserInfo.id = CURRENT_USER_ID;

        response = {
          type: 'success',
          currentUser: updatedUserInfo,
        };
      } else {
        response = { type: 'error', errorMessage: "The user doesn't exist." };
      }
    } catch (error) {
      response = { type: 'error', errorMessage: error.message };
    }

    return response;
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * implements the firebase change password functionality
 * @param {String} newPassword the new password
 */
export const firebaseChangePassword = async (newPassword) => {
  if (CURRENT_USER_ID) {
    let response;

    try {
      const userRef = firestore.doc(`users/${CURRENT_USER_ID}`);

      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        const user = auth.currentUser;
        await user.updatePassword(newPassword);

        response = {
          type: 'success',
          successMessage: 'Your password has been changed successfully',
        };
      } else {
        response = { type: 'error', errorMessage: "The user doesn't exist." };
      }
    } catch (error) {
      response = { type: 'error', errorMessage: error.message };
    }

    return response;
  } else {
    return { type: 'error', errorMessage: 'You must be signed in to complete this process' };
  }
};

/**
 * helper method to create new user based on different auth mechanisms
 * @param {Object} userInfo the user info object
 * @param {Object} additionalUserInfo the additional info of the user
 */
export const createUserProfileDocument = async (userInfo, additionalUserInfo) => {
  if (!userInfo) return;

  const userRef = firestore.doc(`users/${userInfo.uid}`);

  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email } = userInfo;
    const createdAt = new Date();

    try {
      const newUser = {
        username: displayName ? displayName : additionalUserInfo.username,
        email,
        createdAt,
        name: '',
        country: '',
        city: '',
        address: '',
        phone: '',
        zip: '',
        ...additionalUserInfo,
      };

      await userRef.set(newUser);
      return newUser;
    } catch (error) {
      return error;
    }
  } else {
    return {
      id: userSnapshot.id,
      ...userSnapshot.data(),
    };
  }
};
