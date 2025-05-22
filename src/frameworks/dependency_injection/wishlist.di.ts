import { WishlistController } from "../../interfaces/controllers/wishlistcontroller/wishlistcontroller";
import { WishlistMongoRepository } from "../../interfaces/repositories/wishlist/Wishlistrepositories";
import { CreateWishlistuseCase } from "../../use-cases/wishlist/create.usecase";
import { User_deletewishlistuseCase } from "../../use-cases/wishlist/deletewishlistByid";
import { User_getwishlistsbyUserId } from "../../use-cases/wishlist/getwishlistsuser";




const wishlistrepositories=new WishlistMongoRepository();


const createwishlist=new CreateWishlistuseCase(wishlistrepositories);
const getwishlist_byuserId=new User_getwishlistsbyUserId(wishlistrepositories);
const deletewishlistByid=new User_deletewishlistuseCase(wishlistrepositories);

export const wishlistcontroller=new WishlistController(createwishlist,getwishlist_byuserId,deletewishlistByid);
