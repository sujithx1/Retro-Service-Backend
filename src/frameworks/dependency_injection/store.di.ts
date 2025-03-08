import { StoreController } from "../../interfaces/controllers/store/storeController";
import { SendOtp } from "../../use-cases/store/auth/sendotp";
import { StoreMongoRepositories } from "../../interfaces/repositories/store/storeMongorepositories";
import { Store_otpcheck } from "../../use-cases/store/auth/checkOtp";
import { CheckOtp } from "../../use-cases/userside/auth/otpchecking";
import { WalletMongoRepositories } from "../../interfaces/repositories/wallet/walletMongoepositories";
import { StoreLoginuseCase } from "../../use-cases/store/auth/login";
import { ProductMongoRepositories } from "../../interfaces/repositories/product/productmongorepositories";
import { Store_addproductuseCase } from "../../use-cases/store/product/addproductUsecase";
import { GetAllproductsuseCase } from "../../use-cases/store/product/getallproducts";
import { Store_addlocationuseCase } from "../../use-cases/store/auth/putlocation";
import { ProductgetbyIduseCase } from "../../use-cases/store/product/getproductbyid";
import { Store_putproductuseCase } from "../../use-cases/store/product/putproduct";
import { Store20kmDistance } from "../../use-cases/store/getallstores";
import { Store_getproductsbystoreId } from "../../use-cases/store/getproductsbystoreId";
import { Store_getiduseCase } from "../../use-cases/store/getstoreByid";
import { Orders_getstoriduseCase } from "../../use-cases/store/checkout/getordersbyStoreId";
import { CheckoutMongoRepositories } from "../../interfaces/repositories/checkout/checkoutMongoRepositories";
import { User_orderputuseCase } from "../../use-cases/store/checkout/putorderby";
import { TransactionMongoRepositories } from "../../interfaces/repositories/transaction/transactionMongoRepositories";

const storeRepositories = new StoreMongoRepositories();
const walletRepositories = new WalletMongoRepositories();
const productRepositories = new ProductMongoRepositories();
const checkoutrepositoires=new  CheckoutMongoRepositories()
const transactionrepositoires=new TransactionMongoRepositories()

const otpvalidate = new CheckOtp();
const sendOtp = new SendOtp(storeRepositories, walletRepositories);
const checkotp = new Store_otpcheck(
  otpvalidate,
  storeRepositories,
  walletRepositories
);
const login = new StoreLoginuseCase(storeRepositories)
const stores20km = new Store20kmDistance(
  storeRepositories,
  productRepositories
);

const addproduct = new Store_addproductuseCase(productRepositories);
const getallProducts = new GetAllproductsuseCase(productRepositories);
const addLoction = new Store_addlocationuseCase(storeRepositories);
const getproduct = new ProductgetbyIduseCase(productRepositories);
const putproduct = new Store_putproductuseCase(productRepositories);
const storeProducts = new Store_getproductsbystoreId(productRepositories);
const getstorebyid=new Store_getiduseCase(storeRepositories)
const getordersbyStoreId=new Orders_getstoriduseCase(checkoutrepositoires)
const putordertstatus=new User_orderputuseCase(checkoutrepositoires,walletRepositories,transactionrepositoires)
export const storeController = new StoreController(
  sendOtp,
  checkotp,
  login,
  addproduct,
  getallProducts,
  addLoction,
  getproduct,
  putproduct,
  stores20km,
  storeProducts,
  getstorebyid,
  getordersbyStoreId,
  putordertstatus
);
