import { Product_Entities } from "../../../../entities/ProductEntities";

export interface IProduct_adminRepositories {
  productCreate(product: Product_Entities): Promise<Product_Entities>;
  productFindbyName(name: string): Promise<Product_Entities | null>;
}
