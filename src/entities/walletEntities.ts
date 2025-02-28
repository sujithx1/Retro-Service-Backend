export class WalletEntities{
    constructor(
        public id:string,
        public userId:string,
        public userType:"user"|"employee"|"admin"|"store",
        public balance:number,
        public createdAt?:Date,
        public updatedAt?:Date
    ){}

}