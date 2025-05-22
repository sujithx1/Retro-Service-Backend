import { OAuth2Client } from "google-auth-library";
const clientId=process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientId);

export const verifyGoogleToken = async (token: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    return payload; // Contains user details like email, name, etc.
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid Token");
  }
};
