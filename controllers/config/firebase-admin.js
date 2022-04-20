import admin from 'firebase-admin';

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
} catch (err) {
  /**
   * We skip the "already exists" message which is
   * not an actual error when when we're hot-reloading
   */
  if (!/already exists/u.test(err.message)) {
    console.error('Firebase admin initialization error', process.env.FIREBASE_PROJECT_ID);
  }
}

export const firestore = admin.firestore();
export const database = admin.database();
export const auth = admin.auth();
export const storage = admin.storage();
export const messaging = admin.messaging();

export default admin;
