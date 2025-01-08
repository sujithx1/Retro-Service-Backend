

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
        public location:string="",
        public authSource?: 'self' | 'google',
        public role:string="employee",
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
} 