"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cloudinaryConfig.ts
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary with your credentials (stored in environment variables)
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_APIKEY,
    api_secret: process.env.CLOUDNARY_API_SECRECT,
});
exports.default = cloudinary_1.v2;
