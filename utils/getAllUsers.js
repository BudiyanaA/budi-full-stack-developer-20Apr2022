import { firestore } from '../controllers/config/firebase-admin';

async function getAllUsers() {
  let users = [];

  try {
    const usersRef = await firestore
      .collection('users')
      .get()

    await usersRef.forEach((doc) => {
      users.push(doc.data());
    });

    return users;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export default getAllUsers;
