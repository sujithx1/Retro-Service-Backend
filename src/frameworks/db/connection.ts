import mongoose from "mongoose";

export const connectdb=() => {
    mongoose
  .connect("mongodb://localhost:27017/Retro_Service")
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log("mongodb not connected", err));

    
} 