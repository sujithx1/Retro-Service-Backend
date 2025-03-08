import { CheckoutEntities } from "../../../entities/checkoutEntities";

export interface IcheckoutRepositories{
    findById(id:string):Promise<CheckoutEntities|null>
    findByuserId(userId:string):Promise<CheckoutEntities[]>
    findByStoreId(storeId:string):Promise<CheckoutEntities[]>
    findBycartId(cartId:string):Promise<CheckoutEntities|null>
    findByIdAndupdate(checkoutData:CheckoutEntities):Promise<CheckoutEntities|null>
    create(checkoutData:CheckoutEntities):Promise<CheckoutEntities>
}