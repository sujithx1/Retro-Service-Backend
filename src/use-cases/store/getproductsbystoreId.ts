import { Product_Entities } from "../../entities/ProductEntities";
import { IproductRepositories } from "../../interfaces/repositories/product/IproductRepositories";


export class Store_getproductsbystoreId{
    constructor(
        private productrepositories:IproductRepositories
    ) {

        
        
    }

    async execute(storeId:string):Promise<Product_Entities[]>{
        const products=await this.productrepositories.findBystoreId(storeId);
        return products;
    }
}