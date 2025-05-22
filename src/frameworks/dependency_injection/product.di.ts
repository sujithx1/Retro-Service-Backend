import { ProductController } from "../../interfaces/controllers/products/productController";
import { ProductMongoRepositories } from "../../interfaces/repositories/product/productmongorepositories";
import { Store_getproductsbystoreId } from "../../use-cases/store/getproductsbystoreId";
import { ProductgetbyIduseCase } from "../../use-cases/store/product/getproductbyid";
import { GetProductSearchuseCase } from "../../use-cases/store/product/SearchProduct";

const productrepositories=new ProductMongoRepositories();



const getproductsbyStoreId=new Store_getproductsbystoreId(productrepositories);
const getproductByid=new ProductgetbyIduseCase(productrepositories);
const search_productByname=new GetProductSearchuseCase(productrepositories);

export const productcontroller=new ProductController(getproductsbyStoreId,getproductByid,search_productByname);