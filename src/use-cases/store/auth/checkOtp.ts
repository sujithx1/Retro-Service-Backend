import { StoreResponseDto } from "../../../DTO/dto";
import { StoreMap } from "../../../DTO/map/store.map";
import { StoreEntities } from "../../../entities/StoreEntities";
import { WalletEntities } from "../../../entities/walletEntities";
import { IstoreRepositories } from "../../../interfaces/repositories/store/Istorerepositories";
import { IwalletRepositories } from "../../../interfaces/repositories/wallet/Iwalletrepositories";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { hashpass } from "../../../utils/hashPassword";
import { generateStoreID } from "../../../utils/helper/generateStoreId";
import redisClient from "../../../utils/helper/redis";
import { sendOtp } from "../../../utils/otp";
import { CheckOtp } from "../../userside/auth/otpchecking";


export class Store_otpcheck{
    constructor(
        private otpchecking:CheckOtp,
        private storeRepositories:IstoreRepositories,
        private walletrepositories:IwalletRepositories
    ) {
        
    }

    async execute(otp:number):Promise<StoreResponseDto>{

        const storedOtp = await redisClient.get("storeotp");
      if (!storedOtp) throw new CustomError("OTP expired ",401,AppError.OtpExpired);
      const checkotp=await this.otpchecking.execute(Number(otp),Number(storedOtp));
      if (!checkotp) throw new CustomError("Invalid OTP",401,AppError.OtpMismatch);
      const storeData = await redisClient.get("storeData");
    if (!storeData) throw new CustomError("storeData Not found ",401,AppError.ResourceNotFound);

      const storeDetails:StoreEntities = JSON.parse(storeData);

      const storeId=await generateStoreID(storeDetails.name);
storeDetails.storeId=storeId;
console.log(storeId);
await sendOtp(storeDetails.owner_email, storeDetails.name, storeId,true);

const hashPassword=await hashpass(storeDetails.password);
storeDetails.password=hashPassword;

      
      const store= await this.storeRepositories.create(storeDetails);

       const wallet=new WalletEntities(
                          "",
                          store.id,
                          "store",
                          0,
                      
                          
                      );
                          
                      this.walletrepositories.create(wallet);

     return StoreMap.toResponse(store);



    }
}