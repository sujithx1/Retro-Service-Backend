

export class MessageEntites{
    constructor(
        public id:string,
        public sender:string,
        public receiver:string,
        public message:string,
        public userType:"user"|"employee",
        public timestamp:Date,
        public isRead:boolean 
        

    ){}
}