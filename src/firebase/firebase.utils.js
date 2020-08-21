import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { FIREBASE_CONFIG } from '../config';

const config = FIREBASE_CONFIG;

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const signInWithGoogle = async () => {
  return await auth.signInWithPopup(provider);
};

export default firebase;
