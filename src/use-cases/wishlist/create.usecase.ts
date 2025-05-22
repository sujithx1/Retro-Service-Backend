import { WishlistEntity } from "../../entities/wishlistEntities";
import { IWishlistRepository } from "../../interfaces/repositories/wishlist/Iwihslistrepositories";


export class CreateWishlistuseCase{
    constructor(
        private wishlistrepositories:IWishlistRepository
    ) {
        
    }

    async execute(productId:string,userId:string):Promise<WishlistEntity>{
        return await this.wishlistrepositories.addToWishlist(userId,productId);
    }
}