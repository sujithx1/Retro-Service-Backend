import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "https://example.com/default-profile-pic.png",
    },
  isAdmin:{
    type:Boolean,
    default:false
  }
},
  {
    timestamps: true,
  }
);
 export const UserModel=mongoose.model('User',userSchema)