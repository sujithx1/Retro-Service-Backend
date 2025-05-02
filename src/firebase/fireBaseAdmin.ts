// src/config/firebase.ts
import admin from 'firebase-admin';
import { firebaseCredentials } from './firebase.config';

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredentials),
  databaseURL: `https://${firebaseCredentials.project_id}.firebaseio.com`,
});

export default admin;
