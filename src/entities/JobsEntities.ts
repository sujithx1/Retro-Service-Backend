

export class JobsEntities{
    constructor(
        public id:string,
        public name:string,
        public description:string,
        public minimum_wage:number,
        public isBlock:boolean=false,
        public image?:string
    ) {}


}