
// cloudinaryConfig.ts
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials (stored in environment variables)
cloudinary.config({
  cloud_name: process.env.Cloudnary_Name!,
  api_key: process.env.Cloudnary_Api_Key!,
  api_secret: process.env.Cloudnary_Api_Secret!,
});

export default cloudinary;


