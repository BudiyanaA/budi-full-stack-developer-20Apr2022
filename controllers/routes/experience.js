import {
  validationHandler,
  validations,
} from '../middleware/validation-handler';
import { check } from 'express-validator';
import { auth, firestore } from '../config/firebase-admin';
import firebase from '../config/firebase';

