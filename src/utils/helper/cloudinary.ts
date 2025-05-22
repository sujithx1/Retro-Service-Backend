
// cloudinaryConfig.ts
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your credentials (stored in environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME!,
  api_key: process.env.CLOUDNARY_APIKEY!,
  api_secret: process.env.CLOUDNARY_API_SECRECT!,
});

export default cloudinary;


