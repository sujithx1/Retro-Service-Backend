import { Product_Entities } from "../../../entities/ProductEntities";
import { ICategories_admin_Repositories } from "../../../interfaces/repositories/admin/categories/categoryRepositories";
import { IProduct_adminRepositories } from "../../../interfaces/repositories/admin/product/adminproductRepositories";

export class Admin_add_product_Usecase {
  constructor(private productRepositories: IProduct_adminRepositories,
    private categoryRepositories:ICategories_admin_Repositories
    
  ) {}
  async execute(
    name: string,
    description:string,
    stock: number,
    price: number,
    categoryName:string,
    images: string[]
  ): Promise<Product_Entities> {
    const existProduct = await this.productRepositories.productFindbyName(name);

    if (existProduct) throw new Error("product already exist");
    const categoryId=await this.categoryRepositories.categoryFindbyName(categoryName)
    if(!categoryId) throw new Error("category not exist..")
    const productDate = new Product_Entities("", name,description, stock,categoryId, price, images);

    const product = await this.productRepositories.productCreate(productDate);
    return new Product_Entities(
      product.id,
      product.name,
      product.description,
      product.stock,
      product.categoryId,
      product.price,
      product.images,
      product.isBlock
    );
  }
}
