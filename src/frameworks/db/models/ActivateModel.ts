import mongoose, { Document, Model, Schema } from "mongoose";
interface IActiveConnection extends Document {
    userType: string;
    userId: string;
    employeeId: string;
    socketId: string;
  }

  const ActiveConnectionSchema: Schema = new Schema({
    userType: { type: String, required: true },
    employeeId: { type: String, required: true },
    userId: { type: String, required: true },
    socketId: { type: String, required: true },
  });


  export const ActiveConnection = mongoose.model<IActiveConnection>(
    "ActiveConnection",
    ActiveConnectionSchema
  );
  