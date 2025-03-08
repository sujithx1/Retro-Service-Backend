import { Date, ObjectId } from "mongoose";
import { IuserTypes } from "../frameworks/db/models/UserModel";
import { IStore_types } from "../frameworks/db/models/Storemodel";
import { IProduct } from "../frameworks/db/models/ProductModel";

export class CartEntities{
    constructor(
        public id:string,
        public userId:string|ObjectId|IuserTypes,
        public storeId:string|ObjectId|IStore_types,
        public products: Array<{
            product: string | ObjectId | IProduct;
            quantity: number;
            price: number;
        }>,       
        public createdAt?:Date,
        public updatedAt?:Date,
    ){}
}