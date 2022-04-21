import { firestore } from '../../controllers/config/firebase-admin';


export const getAllUsers = async (req, res, next) => {

  let users = [];
  try {
    const snapshot = await firestore.collection('users').get();

    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    return res.status(200).json(users);
    
  } catch (err) {
    next(err);
  }
};
