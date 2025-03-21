import { Product_Entities } from "../../../entities/ProductEntities";
import { ICategory } from "../../../frameworks/db/models/Category_Model";
import { IProduct, Product_Model } from "../../../frameworks/db/models/ProductModel";
import { IproductRepositories } from "./IproductRepositories";



const returnproduct = (product: IProduct): Product_Entities => {
  return  new Product_Entities(
    product._id.toString(),
    product.storeId.toString(),
    product.name,
    product.description,
    product.stock,
    product.category as ICategory,
    product.price,
    product.images,
    product.isBlock,
    product.createdAt,
    product.updatedAt
  )
};
export class ProductMongoRepositories implements IproductRepositories{


  async create(product: Product_Entities): Promise<Product_Entities> {
    const addproduct=await Product_Model.create(product)
    return returnproduct(addproduct)

    
      
  }
  async findByname(name: string): Promise<Product_Entities | null> {
      const product=await Product_Model.findOne({name:name})
      if(!product)return null
      return returnproduct(product)
  }

 async getAll(): Promise<Product_Entities[]> {

    const products= await Product_Model.find({isBlock:false})
    return products.map((item)=>returnproduct(item))

      
  }

  async findById(id: string): Promise<Product_Entities|null> {
      const product=await Product_Model.findById(id)
      .populate('category','name description')
.exec()
      if(!product)return null

      // await product.populate("storeId", "name ownername")

      return  returnproduct(product)
  }


  async findByIdandUpdate(productData: Product_Entities): Promise<Product_Entities | null> {
    const updatedProduct = await Product_Model.findByIdAndUpdate(
        productData.id, // Ensure this is a valid MongoDB ObjectId
        { ...productData },
        { new: true, runValidators: true,upsert:true } // `new: true` returns the updated document
    );
    if(!updatedProduct)return null

    // await updatedProduct.populate({
    //   path: "category",
    //   select: "name description",
    // })
    // await updatedProduct.populate({
    //   path:'storeId',
    //   select:'name owner_name'
    // })
    return returnproduct(updatedProduct)

  }

  async findBystoreId(storeId: string): Promise<Product_Entities[] > {
      const products=await Product_Model.find({storeId:storeId})

    
      return products.map((item)=>returnproduct(item))
  }


   async searchByname(quary: string): Promise<Product_Entities[]> {
    
    const products=await Product_Model.find({
      name: { $regex: quary, $options: "i" }, // Case-insensitive search
    })

return products.map((item)=>returnproduct(item))      
   }

  
}