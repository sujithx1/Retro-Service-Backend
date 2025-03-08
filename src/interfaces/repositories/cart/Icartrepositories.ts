import { CartEntities } from "../../../entities/cartEntities";

export interface Icartrepositories{
    findById(id:string):Promise<CartEntities|null>
    create(cartData:CartEntities):Promise<CartEntities>
    findByIdUpdate(cartData:CartEntities):Promise<CartEntities|null>
    findByuserId(userId:string):Promise<CartEntities|null>
    findByProductId(productId:string):Promise<CartEntities|null>
    findByIdAndDelete(id:string):Promise<boolean>
    findByIdDelete(id:string):Promise<void>
}