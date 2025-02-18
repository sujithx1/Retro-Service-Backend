import { ObjectId } from "mongoose";



export class Product_Entities{
    constructor(
        public id:string,
        public storeId:string,
        public name:string,
        public description:string,
        public stock:number,
        public categoryId:string,
        public price:number,
        public images:string[],
        public isBlock:boolean=false,
        public createdAt?:Date,
        public updatedAt?:Date
    ) {}
}