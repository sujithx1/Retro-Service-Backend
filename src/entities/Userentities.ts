

export class UserIntities{
    constructor(
        public id: string,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public isActive: boolean = false,
        public profilePic: string = "https://example.com/default-profile-pic.png",
        public isAdmin: boolean = false,
        public createdAt?: Date,
        public updatedAt?: Date


    ) {}
    validateEmail():boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email)

  }


}