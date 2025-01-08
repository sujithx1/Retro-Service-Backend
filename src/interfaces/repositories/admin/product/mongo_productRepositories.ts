import { Product_Entities } from "../../../../entities/ProductEntities";
import { ICategory } from "../../../../frameworks/db/models/Category_Model";
import {  Product_Model } from "../../../../frameworks/db/models/ProductModel";
import { IProduct_adminRepositories } from "./adminproductRepositories";

export class Mongo_Product_adminrepositories implements IProduct_adminRepositories{
    async productCreate(product: Product_Entities): Promise<Product_Entities> {
        const productDate = await Product_Model.create(product);
        await productDate.populate<{ category: ICategory }>("Category");
        const categoryName = (productDate.category as ICategory).name;
    
        return new Product_Entities(
          productDate.id,
          productDate.name,
          productDate.description,
          productDate.stock,
          categoryName,
          productDate.price,
          productDate.images,
          productDate.isBlock,
          productDate.createdAt,
          productDate.updatedAt
        );
      }
      async productFindbyName(name: string): Promise<Product_Entities | null> {
        const product = await Product_Model.findOne({ name: name }).populate<{
          category: ICategory;
        }>("Category");
        if (!product) return null;
        return new Product_Entities(
          product.id,
          product.name,
          product.description,
          product.stock,
          product.category.name,
          product.price,
          product.images,
          product.isBlock,
          product.createdAt,
          product.updatedAt
        );
      }
     
}