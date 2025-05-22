

export class AdminEntities{
    constructor(
        public id:string,
        public username:string,
        public email:string,
        public phone:string,
        public password:string,
        public isActive: boolean = false,
        public profilePic: string = "https://example.com/default-profile-pic.png",
        public isAdmin: boolean = false,
        public authSource?: "self" | "google",
        public role:"user"|"admin"="admin",
        public createdAt?: Date,
        public updatedAt?: Date

    ){}
}