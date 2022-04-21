import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

try {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
} catch (err) {
  /**
   * We skip the "already exists" message which is
   * not an actual error when when we're hot-reloading
   */
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin initialization error', err.stack);
  }
}

export const clientAuth = firebase.auth();
// export const clientDatabase = firebase.database();
// const clientStorage = firebase.storage();

// Auth Providers
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const facebookAuth = new firebase.auth.FacebookAuthProvider();
export const twitterAuth = new firebase.auth.TwitterAuthProvider();

export default firebase;
