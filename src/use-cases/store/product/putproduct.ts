import { Product_Entities } from "../../../entities/ProductEntities";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";


export class Store_putproductuseCase{
    constructor(
        private productRepositories:IproductRepositories
    ) {
        
    }

    async execute(id:string,name:string,quantity:number,price:number,description:string,images:string[],category:string):Promise<Product_Entities>{
        const product=await this.productRepositories.findById(id);
                if(!product)throw new CustomError("product not found",401,AppError.ResourceNotFound);
        
        if(product.name!==name)
        {
            const existproduct=await this.productRepositories.findByname(name);
            if(existproduct) throw new CustomError("product already exist ",401,AppError.DuplicateError);
        }
        
        product.stock=quantity,
        product.price=price,
        product.description=description,
        product.images=images,
        product.category=category;
        const update=await this.productRepositories.findByIdandUpdate(product);
        if(!update)throw new CustomError("product not updated ",401,AppError.ServerError);

        return update; 

    
 
    }
}