import { ObjectId } from "mongoose";
import { IuserTypes } from "../frameworks/db/models/UserModel";
import { IStore_types } from "../frameworks/db/models/Storemodel";
import { IProduct } from "../frameworks/db/models/ProductModel";

export class CheckoutEntities {
  constructor(
    public id: string,
    public userId: string | ObjectId | IuserTypes,
    public storeId: string | ObjectId | IStore_types,
    public  cart: { 
       products: Array<{ 
           product:  ObjectId | IProduct|string; 
           quantity: number; 
           price: number;
       }>;
      },
    public total: number,
    public paymentMethod: "razorpay" | "cod"|"wallet",
    public paymentStatus: "pending" | "completed" | "failed" = "pending",
    public orderStatus:"pending" | "completed" | "failed" |"cancelled"|"returned"|"return-confirmed" = "pending",
    public transactionId?: string,
    public concern?: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}
}
