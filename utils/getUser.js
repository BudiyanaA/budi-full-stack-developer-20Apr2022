import { firestore } from '../controllers/config/firebase-admin';

async function getUser(uid) {

  try {
    const userRef = await firestore.collection('users').doc(uid);

    const doc = await userRef.get();
    const data = await doc.data();

    if (data === undefined) {
      throw new Error();
    }

    return data;
  } catch (err) {
    console.error(err);

    return err;
  }
}

export default getUser;
