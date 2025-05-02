// src/config/firebase.ts
import admin from 'firebase-admin';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config(); // Loads .env

const serviceAccountPath = path.resolve(process.env.FIREBASE_CONFIG_PATH!);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
