import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Cart_deleteCartid{
    constructor(
        private cartrepositories:Icartrepositories
    ) {}

    async execute(id:string):Promise<boolean>{

        const cart=await this.cartrepositories.findByIdAndDelete(id)
        if(!cart)throw new CustomError("not updated ",401,AppError.ServerError);
        return true
         

    }
}