import {
  validationHandler,
  validations,
} from '../middleware/validation-handler';
import { check } from 'express-validator';
import { auth, firestore } from '../config/firebase-admin';
// import firebase from '../config/firebase';

export const register = async (req, res, next) => {
  await validationHandler(
    req,
    res,
    validations([
      check('username', 'Full name is required!').notEmpty(),
      check('email', 'Invalid email address').isEmail().notEmpty(),
      check('password', 'Title is required').notEmpty(),
    ])
  );

  const { username, email, password } = req.body;

  try {
    // Create user
    const userRecord = await auth.createUser({
      email: email,
      emailVerified: false,
      password: password,
      displayName: username,
      disabled: false,
    });

    // Init user
    const setUser = {
      uid: userRecord.uid,
      username: email,
      email: email,
      experience: [],
    };

    // Store to firestore
    await firestore
      .collection('users')
      .doc(userRecord.uid)
      .set(setUser, { merge: true });

    return res.status(200).json({
      success: true,
      message: `Register successfully`,
      data: setUser,
    });
  } catch (err) {
    next(err);
  }
};

// export const login = async (req, res, next) => {
//   await validationHandler(
//     req,
//     res,
//     validations([
//       check('email', 'Please enter a valid email address').isEmail(),
//       check('password', 'Password is required').not().isEmpty(),
//     ])
//   );

//   const { email, password } = req.body;

//   try {
//     await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

//     // Login process begin
//     const { user } = await firebase
//       .auth()
//       .signInWithEmailAndPassword(email, password);

//     const { token } = await user.getIdTokenResult();

//     return res.status(200).json({
//       success: true,
//       token: token,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
