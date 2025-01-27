import mongoose, { Document, Schema } from "mongoose";
// import { Document } from "mongoose";

interface IMessage extends Document {
  sender: string;
  receiver: string;
  userType: "user" | "employee";
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const MessageSchema = new Schema<IMessage>({
  sender: {
     type: String,
     required: true },
  receiver: { type: String, required: true },
  message: { type: String, required: true },
  userType: { type: String, enum: ["user", "employee"], required: true },
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
});

export const MessageModel = mongoose.model("Message", MessageSchema);
