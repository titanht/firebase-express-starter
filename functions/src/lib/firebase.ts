/* eslint-disable import/namespace */
import * as firebaseAdmin from 'firebase-admin';
import firebaseApp from 'firebase';

const config = {
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  apiKey: process.env.API_KEY,
  appId: process.env.APP_ID,
};

try {
  firebaseAdmin.initializeApp(config);
  firebaseApp.initializeApp(config);
  if (process.env.NODE_ENV !== 'production') {
    firebaseApp.auth().useEmulator('http://localhost:9099/');
  }
} catch (_err) {}

export const db = firebaseAdmin.firestore();

export const rtdb = firebaseAdmin.database();

export const admin = firebaseAdmin;

export const firebase = firebaseApp;
