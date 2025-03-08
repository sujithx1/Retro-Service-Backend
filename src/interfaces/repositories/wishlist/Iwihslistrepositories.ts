import { WishlistEntity } from "../../../entities/wishlistEntities";

export interface IWishlistRepository {
    addToWishlist(userId: string, productId: string): Promise<WishlistEntity>;
    removeFromWishlist(userId: string, productId: string): Promise<boolean>;
    deletewishlist(id:string): Promise<string>;
    getWishlistByUser(userId: string): Promise<WishlistEntity[]>;
  }
  