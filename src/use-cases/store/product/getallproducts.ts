import { Product_Entities } from "../../../entities/ProductEntities";
import { IproductRepositories } from "../../../interfaces/repositories/product/IproductRepositories";

export class GetAllproductsuseCase{
    constructor(
        private produtrepositories:IproductRepositories
    ) {}

    async execute():Promise<Product_Entities[]>{
        return await this.produtrepositories.getAll();

    }


}