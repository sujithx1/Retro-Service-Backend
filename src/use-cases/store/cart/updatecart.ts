import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";

export class Cart_updateuseCase{
    constructor(
        private cartrepositories:Icartrepositories,
        private productrepositories:IproductRepositories
    ) {
        
    }

    async execute(cartData:CartEntities):Promise<CartEntities>{
        const findcart=await this.cartrepositories.findById(cartData.id)
        if(!findcart)throw new CustomError('cart not found',401,AppError.ResourceNotFound)
            const findproduct=await this.productrepositories.findById(cartData.productId.toString())
        if(!findproduct)throw new CustomError('product not found',401,AppError.ResourceNotFound)
        findcart.quantity=+cartData.quantity,
    findcart.price=findcart.quantity*findproduct.price
    
    const updatecart=await this.cartrepositories.findByIdUpdate(findcart)
    if(!updatecart)throw new CustomError('cart not  updated',401,AppError.ServerError)
        return updatecart
    }
}