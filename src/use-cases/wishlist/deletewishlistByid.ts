import { IWishlistRepository } from "../../interfaces/repositories/wishlist/Iwihslistrepositories";


export class User_deletewishlistuseCase{
    constructor(
        private wishlistrepositories:IWishlistRepository
    ) {
        
    }

    async execute(id:string):Promise<string>{
        const wishlist=await this.wishlistrepositories.deletewishlist(id);
        return wishlist;
    }
}