export class WalletEntities{
    constructor(
        public id:string,
        public userId:string,
        public userType:"user"|"employee"|"admin",
        public balance:number,
        public createdAt?:Date,
        public updatedAt?:Date
    ){}

}