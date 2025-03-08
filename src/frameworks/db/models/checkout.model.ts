import mongoose, { Schema, Document, ObjectId } from "mongoose";
import { IProduct } from "./ProductModel";

export interface ICheckout extends Document {
  userId: ObjectId;
  cart: { 
   products: Array<{ 
       product:  ObjectId | IProduct; 
       quantity: number; 
       price: number;
   }>;
  };
  storeId: ObjectId; // ✅ Store ID directly

  total: number;
  paymentStatus: "pending" | "completed" | "failed";
  paymentMethod: "razorpay" | "cod"| "wallet";
  orderStatus: "pending" | "completed" | "failed"|"cancelled"|"returned"|"return-confirmed";
  transactionId?: string;
  concern?:string;
  createdAt: Date;
  updatedAt: Date;
}

const CheckoutSchema = new Schema<ICheckout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cart: { 
        products: Array<{ 
          product:{type: ObjectId | IProduct,ref: "Product"} 
          quantity: number; 
          price: number;
        }>
    },
            storeId: { type: Schema.Types.ObjectId, ref: "Store", required: true }, // ✅ Store ID from cart

    total: { type: Number, required: true },
    paymentStatus: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      default: "pending" 
    },
    orderStatus: { 
      type: String, 
      enum: ["pending", "completed", "failed","cancelled","returned","return-confirmed"], 
      default: "pending" 
    },
    paymentMethod: { 
      type: String, 
      enum: ["razorpay", "cod"], 
      required: true 
    },
    transactionId: { type: String, default: null }, // Razorpay transaction ID
    concern: { type: String, default: null }, // Razorpay transaction ID
  },
  { timestamps: true }
);

export const CheckoutModel = mongoose.model<ICheckout>("Checkout", CheckoutSchema);

