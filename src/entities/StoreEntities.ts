import { Locationuser_types } from "../types/user";

export class StoreEntities{
    constructor(
        public id:string,
        
        public name:string,
        public owner_name:string,
        public owner_email:string,
        public owner_phone:string,
        public isActive:boolean=true,
        public password:string,
        
        public storeId:number,
        public profile_pic:string='https://example.com/default-profile-pic.png',
        public location?:Locationuser_types,
        public createdAt?: Date,
        public updatedAt?: Date 

    ) {
        
    }
}