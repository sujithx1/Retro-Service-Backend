import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";


export class Cart_getProductIduseCase{
    constructor(
        private cartrepositories:Icartrepositories
    ) {
        
    }

    async execute(productId:string):Promise<CartEntities|boolean>{

    const cart=await this.cartrepositories.findByProductId(productId)
    if(!cart)return false
    return cart
    }
}