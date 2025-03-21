import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class GetCart_byIduseCase{
    constructor(
        private cartrepositories:Icartrepositories
    ) {
        
    }

    async execute(cartId:string):Promise<CartEntities>{
        const cart=await this.cartrepositories.findById(cartId)
        if(!cart) throw new CustomError('cart not found',404,AppError.ResourceNotFound)
            return cart
    }
}