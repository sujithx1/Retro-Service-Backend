import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { CheckoutModel, ICheckout } from "../../../frameworks/db/models/checkout.model";
import { IcheckoutRepositories } from "./icheckoutRepositories";


const returnChekout=(checkout:ICheckout)=>{
    return new CheckoutEntities(
    checkout.id.toString(),
    checkout.userId,
    checkout.storeId,
    checkout.cart,
    checkout.total,
    checkout.paymentMethod,
    checkout.paymentStatus,
    checkout.orderStatus,
   checkout.transactionId,  
   checkout.concern,  
   checkout.createdAt,
    checkout.updatedAt
    )

}



export class CheckoutMongoRepositories implements IcheckoutRepositories{


   async findById(id: string): Promise<CheckoutEntities | null> {


    const checkout=await CheckoutModel.findById(id)
    .populate("userId", "username email phone") // Populating user details
  
  .populate("storeId", "name location")
  .populate({
    path: "cart.products.product",
    model: "Product",
    select: "name images price",
  })
    .exec()
    if(!checkout)return null
    return returnChekout(checkout)  
        
    }

   async findByIdAndupdate(checkoutData: CheckoutEntities): Promise<CheckoutEntities | null> {

        const checkout=await CheckoutModel.findByIdAndUpdate(checkoutData.id,{
            ...checkoutData
        },{
            new :true,upsert:true,runValidators:true
        })

        .populate("userId", "username email phone") // Populating user details
        .populate({
            path: "cart.products.product",
            model: "Product",
            select: "name images price",
          })
        .populate("storeId", "name location") // Populating store details

        .exec()
        if (!checkout)return null
        return returnChekout(checkout)  


        
    }
   async findBycartId(cartId: string): Promise<CheckoutEntities | null> {
    const checkout=await CheckoutModel.findOne({cartId:cartId})
    .populate("userId", "username email phone") // Populating user details
    .populate({
        path: "cart.products.product",
        model: "Product",
        select: "name images price",
      })
    .populate("storeId", "name location") // Populating store details

    .exec()
    if(!checkout)return null
    return returnChekout(checkout)  

        
    }
 async findByuserId(userId: string): Promise<CheckoutEntities []> {
    let checkouts=await CheckoutModel.find({userId:userId})
    .populate("userId", "username email phone") // Populating user details
    .populate("storeId", "name location") // Populating store details
   
  checkouts = await Promise.all(
    checkouts.map(async (checkout) => {
      return checkout.populate({
        path: "cart.products.product",
        model: "Product",
        select: "name images price",
      });
    })
  );

    return checkouts.map((item)=>returnChekout(item))  
        
    }

 async findByStoreId(storeId: string): Promise<CheckoutEntities []> {
    let checkouts=await CheckoutModel.find({storeId:storeId})
    .populate("userId", "username email phone") // Populating user details
    .populate("storeId", "name location") // Populating store details
   
  checkouts = await Promise.all(
    checkouts.map(async (checkout) => {
      return checkout.populate({
        path: "cart.products.product",
        model: "Product",
        select: "name images price",
      });
    })
  );

    return checkouts.map((item)=>returnChekout(item))  
        
    }



    async create(checkoutData: CheckoutEntities): Promise<CheckoutEntities> {
        const checkout=await CheckoutModel.create(checkoutData)
        
        return returnChekout(checkout)
        
    }
}