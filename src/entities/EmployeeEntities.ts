import { Locationuser_types } from "../types/user";


export class EmployeeEntities{
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public skills:string[],
        public experience:number,
        public isActive:boolean=true,
        public profilePic: string = "https://example.com/default-profile-pic.png",
        public location?:Locationuser_types,
        public authSource?: 'self' | 'google',
        public role:string="employee",
        public revenue?:number,
        public onDuty:boolean=false,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
} 