import { ObjectId } from "mongoose";
import { IuserTypes } from "../frameworks/db/models/UserModel";

export class WishlistEntity{
    constructor(

        public id: string,
        public userId: string|ObjectId|IuserTypes,
       public productId: string|ObjectId|IuserTypes,
       public createdAt: Date,
       public updatedAt: Date,

        
    ) {
        
    }
}