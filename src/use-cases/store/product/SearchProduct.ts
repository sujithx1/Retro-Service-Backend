import { Product_Entities } from "../../../entities/ProductEntities";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";

export class GetProductSearchuseCase{
    constructor(
        private productrepositories:IproductRepositories
    ) {
        
    }

    async execute(quary:string):Promise<Product_Entities[]>{
        const products=await this.productrepositories.searchByname(quary)

        return products

    }
}