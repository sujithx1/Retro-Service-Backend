// src/config/firebase.ts
import admin from 'firebase-admin';
import serviceAccount from './firebase-adminsdk.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default admin;
