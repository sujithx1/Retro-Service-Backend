import { ServiceAccount } from "firebase-admin";

// Import dotenv to load environment variables
// require("dotenv").config();

// TypeScript interfaces for service account credentials
interface FirebaseCredentials extends ServiceAccount {
    type:string;
    project_id:string;
    private_key_id:string
  private_key: string;
  client_email:string;

  client_id:string
  auth_uri:string
  token_uri:string
  auth_provider_x509_cert_url:string
  client_x509_cert_url:string
  universe_domain:string
}

export const firebaseCredentials: FirebaseCredentials = {
  type: process.env.FIREBASE_TYPE as string,
  project_id: process.env.FIREBASE_PROJECT_ID as string,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID as string,
  private_key: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
  client_id: process.env.FIREBASE_CLIENT_ID as string,
  auth_uri: process.env.FIREBASE_AUTH_URI as string,
  token_uri: process.env.FIREBASE_TOKEN_URI as string,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL as string,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN as string,
};
