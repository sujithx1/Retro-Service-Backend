import { Product_Entities } from "../../../entities/ProductEntities";

export interface IproductRepositories{
    create(product:Product_Entities):Promise<Product_Entities>
    findByname(name:string):Promise<Product_Entities|null>
    getAll():Promise<Product_Entities[]>
    findById(id:string):Promise<Product_Entities|null>
    findByIdandUpdate(productData:Product_Entities):Promise<Product_Entities|null>
    findBystoreId(storeId:string):Promise<Product_Entities[]>
}