import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";


export class Cart_getUseriduseCase{
    constructor(
        private cartrepositories:Icartrepositories
    ) {
        
    }

    async execute(userId:string):Promise<CartEntities[]>{
        const cart=await this.cartrepositories.findByuserId(userId)
        return cart
    }
}