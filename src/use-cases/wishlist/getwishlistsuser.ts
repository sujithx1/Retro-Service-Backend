import { WishlistEntity } from "../../entities/wishlistEntities";
import { IWishlistRepository } from "../../interfaces/repositories/wishlist/Iwihslistrepositories";


export class User_getwishlistsbyUserId{
    constructor(
        private wishlistrepositories:IWishlistRepository
    ) {
        
    }

    async execute(userId:string):Promise<WishlistEntity[]>{
        const wishlist=await this.wishlistrepositories.getWishlistByUser(userId)
        return wishlist
    }
}