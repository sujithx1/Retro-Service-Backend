"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// cloudinaryConfig.ts
const cloudinary_1 = require("cloudinary");
// Configure Cloudinary with your credentials (stored in environment variables)
cloudinary_1.v2.config({
    cloud_name: process.env.Cloudnary_Name,
    api_key: process.env.Cloudnary_Api_Key,
    api_secret: process.env.Cloudnary_Api_Secret,
});
exports.default = cloudinary_1.v2;
