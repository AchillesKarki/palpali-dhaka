import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDEvpK7Z9Iuh8vIcWohDhKpsAIo4cgMMZA',
  authDomain: 'palpali-dhaka.firebaseapp.com',
  databaseURL: 'https://palpali-dhaka.firebaseio.com',
  projectId: 'palpali-dhaka',
  storageBucket: 'palpali-dhaka.appspot.com',
  messagingSenderId: '283308393287',
  appId: '1:283308393287:web:73caf22faea4309bb00262',
  measurementId: 'G-4BRCFDQ6DX',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const createUserProfileDocument = async (userInfo, additionalUserInfo) => {
  if (!userInfo) return;

  const userRef = firestore.doc(`users/${userInfo.uid}`);

  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
    const { displayName, email } = userInfo;
    const createdAt = new Date();

    try {
      await userRef.set({
        username: displayName ? displayName : additionalUserInfo.username,
        email,
        createdAt,
        ...additionalUserInfo,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export default firebase;
