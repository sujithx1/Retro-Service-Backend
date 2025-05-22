// // import multer from "multer";
// // import fs from "fs"

// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //       const uploadPath = ".upload";
// //       fs.mkdirSync(uploadPath, { recursive: true });
// //       cb(null, uploadPath);
// //   },
// //   filename: function (req, file, cb) {
// //       cb(null, file.originalname);
// //   }
// // });


// //  export const upload = multer({ storage });
// // multerConfig.ts
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from './cloudinary';
// declare global {
//   namespace Express {
//     interface Request {
//       file?: File;
//     }
//   }
// }

// interface RequestWithFile extends Express.Request {
//   file: Express.Multer.File;
// }

// // Configure Multer storage with Cloudinary
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary as any,
//   params: {
//     folder: 'profile_pics', // Folder name in Cloudinary
//     allowed_formats: ['jpg', 'jpeg', 'png'], // Supported formats
//     public_id: (req: RequestWithFile, file: Express.Multer.File) => `profile-pics/${Date.now()}-${file.originalname}`, // Custom public ID
//   },
// });

// // Initialize Multer with Cloudinary storage
// const upload = multer({ storage });

// export default upload;
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join( "./uploads");

    // Check if directory exists, create it if not
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      console.log(`Directory "${uploadPath}" was created.`);
    }

    cb(null, uploadPath); // Pass the directory to Multer
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export default upload;
