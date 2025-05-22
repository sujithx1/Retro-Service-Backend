import { CartEntities } from "../../../entities/cartEntities";
import { Icartrepositories } from "../../../interfaces/repositories/cart/Icartrepositories";


export class Cart_getUseriduseCase{
    constructor(
        private cartrepositories:Icartrepositories
    ) {
        
    }

    async execute(userId:string):Promise<CartEntities|null>{
        const cart=await this.cartrepositories.findByuserId(userId);
        if(!cart) return null;
        
        return cart;
    }
}