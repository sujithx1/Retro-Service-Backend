import { Product_Entities } from "../../../entities/ProductEntities";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Store_addproductuseCase{
    constructor(
        private productRepositories:IproductRepositories
    ) {
        
        
    }

    async execute(storeId:string,name:string,quantity:number,price:number,description:string,images:string[],category:string):Promise<Product_Entities>{


         const existProduct=await this.productRepositories.findByname(name);
         if(existProduct) throw new CustomError("product already exisist",401,AppError.DuplicateError);
            
        const product= new Product_Entities(
            "",
            storeId,
            name,
            description,
            quantity,
            category,
            price,
            images


        );
       return await this.productRepositories.create(product);

    }
}