import { CartEntities } from "../../../entities/cartEntities";
import { CartModel, IcartTypes } from "../../../frameworks/db/models/cartModel";
import { Icartrepositories } from "./Icartrepositories";


const returnCart=(cart:IcartTypes)=>{
    return new CartEntities(
        cart.id.toString(),
        cart.userId,
        cart.storeId,
        cart.products,
        cart.createdAt,
        cart.updatedAt 

    )
}


export class CartMongoRepositories implements Icartrepositories{
    

   async create(cartData: CartEntities): Promise<CartEntities> {
    const cart =await CartModel.create(cartData)


   const populatedCart = await CartModel.findById(cart._id)
    .populate("products.product", "name images price stock")
    .populate("userId", "username email phone")
    .populate("storeId", "username email phone")
    .exec();
  return returnCart(populatedCart as IcartTypes);

        
    }
   async findById(id: string): Promise<CartEntities|null> {
    const cart=await CartModel.findById(id)
    if(!cart)return null
    return returnCart(cart)

        
    }
 async   findByIdUpdate(cartData: CartEntities): Promise<CartEntities|null> {
    const cart=await CartModel.findByIdAndUpdate(cartData.id,{
        ...cartData
    },{
        new :true,upsert:true,runValidators:true
    })
    .populate("products.product", "name images price stock") // Only fetch required fields
    .populate("userId", "username email phone") // Only fetch required fields
    .exec();
        
if(!cart)return null
return returnCart(cart)

    }




   async findByProductId(productId: string): Promise<CartEntities | null> {
    const cart = await CartModel.findOne({ "products.product": productId })
    .populate("products.product", "name images price stock") // Fixed typo
    .populate("userId", "username email phone") // Fetch required fields
    .exec();
    if(!cart)return null
    return returnCart(cart)
        
    }
   async findByuserId(userId: string): Promise<CartEntities|null> {
        const cart=await CartModel.findOne({userId:userId})
        .populate("products.product", "name images price stock") // Only fetch required fields
        .populate("userId", "username email phone") // Only fetch required fields
        .exec();
        if(!cart)return null
        return returnCart(cart)
        
    }

    async findByIdAndDelete(id: string): Promise<boolean> {
        const cart=await CartModel.findByIdAndDelete(id)
        if(!cart)return false
        return true
        
    }



   async findByIdDelete(id: string): Promise<void> {
    await CartModel.findByIdAndDelete(id)
        
    }
}