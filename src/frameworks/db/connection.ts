import mongoose from "mongoose";

export const connectdb=() => {
  const dbUrl=process.env.DB_ATLES
 
  
  
    mongoose
  .connect(`${dbUrl}`)
  .then(() => console.log("mongoDb connected"))
  .catch((err) => console.log("mongodb not connected", err));
 
    
} 