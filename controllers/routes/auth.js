import {
  validationHandler,
  validations,
} from '../middleware/validation-handler';
import { check } from 'express-validator';
import { auth, firestore } from '../config/firebase-admin';
import firebase from '../config/firebase';
import {
  BadRequestError,
  InternalServerError,
} from '../../utils/errors';

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
      username: username,
      email: email,
      experience: [],
      age: null,
      photos: 'https://firebasestorage.googleapis.com/v0/b/resume-app-ea669.appspot.com/o/photos%2Fdefault.png?alt=media&token=68b0ff30-14ab-4d20-ad63-9d93858355df',
      fullname: '',
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

export const login = async (req, res, next) => {
  await validationHandler(
    req,
    res,
    validations([
      check('email', 'Please enter a valid email address').isEmail(),
      check('password', 'Password is required').not().isEmpty(),
    ])
  );

  const { email, password } = req.body;

  try {
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    // Login process begin
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    const { token } = await user.getIdTokenResult();

    return res.status(200).json({
      success: true,
      token: token,
    });
  } catch (err) {
    switch (err.code) {
      case 'auth/wrong-password':
        throw BadRequestError('Password you entered is incorrect');
      case 'auth/too-many-requests':
        throw BadRequestError('Login failed, wait a few more moments');
      case 'auth/invalid-email':
        throw BadRequestError('Invalid emails');
      case 'auth/user-not-found':
        throw BadRequestError('User is not registered');
      case 'auth/network-request-failed':
        throw InternalServerError('No Signal');
      default:
        next(err);
    }
  }
};

export const sessionLogin = async (req, res, next) => {
  await validationHandler(
    req,
    res,
    validations([check('token', 'Access token is required').notEmpty()])
  );

  const { token } = req.body;

  try {
    // Get user from firestore
    const user = await auth.verifyIdToken(token);
    const doc = await firestore.collection('users').doc(user.uid).get();

    const userData = doc.data();
    const userSession = {
      isLoggedIn: true,
      ...userData,
    };

    // Set session user
    req.session.set('user', userSession);
    await req.session.save();

    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    next(err);
  }
};

export const profile = async (req, res, next) => {
  const user = req.session.get('user');

  if (!user) {
    req.session.destroy();

    return res.json({
      isLoggedIn: false,
    });
  }

  const userRef = await firestore.collection('users').doc(user.uid).get()
  const userData = await userRef.data();

  !userData && req.session.destroy();

  return res.json({
    isLoggedIn: true,
    ...user,
  });
};

export const userLogout = async (req, res, next) => {
  try {
    // clear cookies
    req.session.destroy();

    return res.status(200).json({
      success: true,
      message: 'Logout successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {

  const body = req.body;
  const user = req.session.get('user');

  try {
    const userRef = await firestore.collection('users').doc(user.uid);

    if (body.photos && body.photos.name != '') {
      // Init storage ref
      const storageRef = firebase.storage().ref(`photos/` + body.photos.name);
      await storageRef.putString(body.photos.source, 'data_url');
      
      const downloadURL = await storageRef.getDownloadURL();
      
      await userRef.update({
        photos: downloadURL,
        fullname: body.fullname,
        age: body.age,
      });
    } else {
      if (body.photos) {
        delete body.photos
      }
      await userRef.update({
        ...body
      });
    }
    const snapshot = await userRef.get();
    const updatedUser = snapshot.data();

    const userSession = {
      isLoggedIn: true,
      ...updatedUser,
    };

    req.session.unset('user');
    req.session.set('user', userSession);
    await req.session.save();

    return res.status(200).json({
      success: true,
      message: `User updated successfully`,
    });
  } catch (err) {
    switch (err.code) {
      case 'auth/email-already-exists':
        throw BadRequestError('Email already in use, change email address');
      case 'auth/phone-number-already-exists':
        throw BadRequestError(
          'Phone number already exists, change another phone number'
        );
      case 'auth/invalid-phone-number':
        throw BadRequestError('Phone number is invalid');
      default:
        next(err);
    }
  }
};
