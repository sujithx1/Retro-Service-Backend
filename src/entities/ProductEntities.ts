import { ObjectId } from "mongoose";
import { ICategory } from "../frameworks/db/models/Category_Model";



export class Product_Entities{
    constructor(
        public id:string,
        public storeId:string,
        public name:string,
        public description:string,
        public stock:number,
        public category:string | ObjectId | ICategory,
        public price:number,
        public images:string[],
        public isBlock:boolean=false,
        public createdAt?:Date,
        public updatedAt?:Date
    ) {}
}