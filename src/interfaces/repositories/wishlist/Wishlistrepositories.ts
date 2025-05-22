import { WishlistEntity } from "../../../entities/wishlistEntities";
import WishlistModel, { IWishlist } from "../../../frameworks/db/models/wishlistModel";
import { IWishlistRepository } from "./Iwihslistrepositories";


const returnWishlist=(wishlist:IWishlist)=>{
    return new WishlistEntity(
        wishlist.id,
        wishlist.userId,
        wishlist.productId,
        wishlist.createdAt,
        wishlist.updatedAt
    );
};

export class WishlistMongoRepository implements IWishlistRepository {
  async addToWishlist(userId: string, productId: string): Promise<WishlistEntity> {
    const wishlistItem = await WishlistModel.create({ userId, productId });
    
    await wishlistItem.populate("userId", "username email phone");
    await wishlistItem.populate("productId", "name images price");
  
    return  returnWishlist(wishlistItem);
  }

  async removeFromWishlist(userId: string, productId: string): Promise<boolean> {
    const result = await WishlistModel.findOneAndDelete({ userId, productId });
    return !!result;
  }
  async  deletewishlist(id: string): Promise<string> {
    const result = await WishlistModel.findByIdAndDelete(id);
    return result?.id;
      

  }

  async getWishlistByUser(userId: string): Promise<WishlistEntity[]> {
    const wishlist = await WishlistModel.find({ userId })
    .populate("userId", "username email phone") // Populating user details
    .populate("productId", "name images price") // Populating user details
    .exec();
    return wishlist.map(item => returnWishlist(item));
  }



}
