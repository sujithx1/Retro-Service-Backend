import { Product_Entities } from "../../../entities/ProductEntities";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class ProductgetbyIduseCase{
    constructor(
        private productrepositories:IproductRepositories
    ) {
        
    }

    async execute(id:string):Promise<Product_Entities>{
        const product=await this.productrepositories.findById(id)
        if(!product)throw new CustomError("product not found",401,AppError.ResourceNotFound)
            return product
    }
}