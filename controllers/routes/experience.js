import {
  validationHandler,
  validations,
} from '../middleware/validation-handler';
import { check } from 'express-validator';
import { auth, firestore } from '../config/firebase-admin';
import firebase from '../config/firebase';

export const createExperience = async (req, res, next) => {
  // await validationHandler(
  //   req,
  //   res,
  //   validations([
  //     check('company', 'Full name is required!').notEmpty(),
  //     check('email', 'Invalid email address').isEmail().notEmpty(),
  //     check('password', 'Title is required').notEmpty(),
  //   ])
  // );

  const { 
    company, 
    title, 
    start_date,
    end_date,
    description, 
    logo,
  } = req.body;

  const user = req.session.get('user');

  try {

    const userRef = await firestore.collection('users').doc(user.uid);
    const userGet = await userRef.get();
    const userData = await userGet.data();

    const storageRef = firebase.storage().ref(`logo/` + logo.name);
    await storageRef.putString(logo.source, 'data_url');
    const downloadURL = await storageRef.getDownloadURL();

    await userRef.update({
      experience: [
        ...userData.experience,
        {
          logo: downloadURL,
          company, 
          title, 
          start_date,
          end_date,
          description, 
        }
      ],
    });

    return res.status(200).json({
      success: true,
      message: `Add Experience successfully`,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllExperience = async (req, res, next) => {

  const user = req.session.get('user');

  try {
    const userRef = await firestore.collection('users').doc(user.uid);
    const userGet = await userRef.get();
    const userData = await userGet.data();

    return res.status(200).json({
      success: true,
      experience: userData.experience
    });
    
  } catch (err) {
    next(err);
  }
};

export const deleteExperience = async (req, res, next) => {
  const { index } = req.query;
  const user = req.session.get('user');

  try {
    const userRef = await firestore.collection('users').doc(user.uid);
    const userGet = await userRef.get();
    const userData = await userGet.data();

    let list = [...userData.experience];
    list.splice(index ,1)

    await userRef.update({
      experience: list,
    });

    return res.status(200).json({
      success: true,
      message: `Experience has been deleted!`,
    });
  } catch (err) {
    next(err);
  }
};

export const editExperience = async (req, res, next) => {
  // await validationHandler(
  //   req,
  //   res,
  //   validations([
  //     check('nama_perumahan', 'Nama Perumahan is required!').notEmpty(),
  //     check('id_kavling', 'Kavling ID is required!').notEmpty(),
  //     check('cluster', 'Nama Cluster is required!').notEmpty(),
  //     check('type', 'Nama Tipe is required!').notEmpty(),
  //     check('blok', 'Nama Blok is required!').notEmpty(),
  //     check('no_kavling', 'No. Rumah is required!').notEmpty(),
  //     check('ipl', 'Fill bill with array object').isArray(),
  //   ])
  // );

  const { 
    company, 
    title, 
    start_date,
    end_date,
    description, 
  } = req.body;
  const { index } = req.query;
  const user = req.session.get('user');

  try {
    const userRef = await firestore.collection('users').doc(user.uid);
    const userGet = await userRef.get();
    const userData = await userGet.data();

    let list = [...userData.experience];
    list[index] = {
      company, 
      title, 
      start_date,
      end_date,
      description, 
    }

    await userRef.update({
      experience: list,
    });

    return res.status(200).json({
      success: true,
      message: `Experience has been updated!`,
    });
  } catch (err) {
    next(err);
  }
};