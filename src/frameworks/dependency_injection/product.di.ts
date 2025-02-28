import { ProductController } from "../../interfaces/controllers/products/productController";
import { ProductMongoRepositories } from "../../interfaces/repositories/product/productmongorepositories";
import { Store_getproductsbystoreId } from "../../use-cases/store/getproductsbystoreId";

const productrepositories=new ProductMongoRepositories()



const getproductsbyStoreId=new Store_getproductsbystoreId(productrepositories)



export const productcontroller=new ProductController(getproductsbyStoreId)