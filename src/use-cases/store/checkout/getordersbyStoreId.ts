import { CheckoutEntities } from "../../../entities/checkoutEntities";
import { IcheckoutRepositories } from "../../../interfaces/repositories/checkout/icheckoutRepositories";

export class Orders_getstoriduseCase{
    constructor(
        private ordersrepositories:IcheckoutRepositories
    ) {
        
    }

    async execute(storeId:string):Promise<CheckoutEntities[]>{
        const orders=await this.ordersrepositories.findByStoreId(storeId);
        return orders;
    }
}