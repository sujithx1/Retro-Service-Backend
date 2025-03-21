import { NextFunction, Request, Response } from "express";
import { StoreSignupValidation } from "../../../utils/helper/Validation";
import { generate_otp } from "../../../utils/otp";
import { SendOtp } from "../../../use-cases/store/auth/sendotp";
import { Store_otpcheck } from "../../../use-cases/store/auth/checkOtp";
import { CustomError } from "../../../utils/errors/custom.errors";
import { AppError } from "../../../utils/errors/error.enum";
import { StoreLoginuseCase } from "../../../use-cases/store/auth/login";
import {
  GenerateAccessToken,
  GenerateRefreshToken,
} from "../../jwt/jwt_auth_token";
import { Store_addproductuseCase } from "../../../use-cases/store/product/addproductUsecase";
import { GetAllproductsuseCase } from "../../../use-cases/store/product/getallproducts";
import { Store_addlocationuseCase } from "../../../use-cases/store/auth/putlocation";
import { ProductgetbyIduseCase } from "../../../use-cases/store/product/getproductbyid";
import { Store_putproductuseCase } from "../../../use-cases/store/product/putproduct";
import { Store20kmDistance } from "../../../use-cases/store/getallstores";
import { Store_getproductsbystoreId } from "../../../use-cases/store/getproductsbystoreId";
import { Store_getiduseCase } from "../../../use-cases/store/getstoreByid";
import { Orders_getstoriduseCase } from "../../../use-cases/store/checkout/getordersbyStoreId";
import { User_orderputuseCase } from "../../../use-cases/store/checkout/putorderby";
import { User_getOrderbyIduseCase } from "../../../use-cases/store/checkout/getorderById";

export class StoreController {
  constructor(
    private sendMails: SendOtp,
    private checkOtp: Store_otpcheck,
    private storelogin: StoreLoginuseCase,
    private addproduct: Store_addproductuseCase,
    private allproduts: GetAllproductsuseCase,
    private storeaddloction: Store_addlocationuseCase,
    private getproduct: ProductgetbyIduseCase,
    private putproduct: Store_putproductuseCase,
    private store20km: Store20kmDistance,
    private getStoreproducts: Store_getproductsbystoreId,
    private getStorebyId: Store_getiduseCase,
    private getOrdersbyStoreId: Orders_getstoriduseCase,
    private putorderComplete: User_orderputuseCase,
    private getorderById:User_getOrderbyIduseCase
  ) {}

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, owner_email, owner_name, password, owner_phone } = req.body;

      const userData = { name, owner_email, owner_name, owner_phone, password };

      StoreSignupValidation({
        name,
        owner_email,
        owner_phone,
        owner_name,
        password,
      });
      const otp = generate_otp();

      console.log("otp", otp);

      const storeOwner = await this.sendMails.execute(name, otp, userData);

      res
        .status(200)
        .json({ message: "Enter Otp check your Email", storeOwner });
    } catch (error) {
      return next(error);
    }
  }

  async Otp_checkingController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { otp } = req.body;

      console.log("otp checking", otp);

      if (!otp) throw new Error("Enter Otp");
      console.log(otp);

      const store = await this.checkOtp.execute(Number(otp));

      res.status(201).json({ message: "success", store });
    } catch (error) {
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeId, password } = req.body;
      if (!storeId || !password)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const store = await this.storelogin.execute(storeId, password);
      const access_token = await GenerateAccessToken(store.id, "store");
      const refresh_token = await GenerateRefreshToken(store.id, "store");

      const { password: _, ...withoutPassword } = store;
      return res
        .cookie("store_refreshToken", refresh_token, {
          httpOnly: true,
        })
        .status(200)
        .json({ success: true, store: withoutPassword, token: access_token });
    } catch (error) {
      return next(error);
    }
  }

  async Add_product(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, quantity, price, description, images, storeId, category } =
        req.body;
      console.log("add product", req.body);
      if (
        !name ||
        !quantity ||
        !price ||
        !description ||
        !images ||
        !storeId ||
        !category
      )
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );

      const product = await this.addproduct.execute(
        storeId,
        name,
        quantity,
        price,
        description,
        images,
        category
      );

      return res.status(201).json({ success: true, product });
    } catch (error) {
      return next(error);
    }
  }
  async getAllproducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await this.allproduts.execute();
      console.log(products);

      return res.status(200).json({ success: true, products });
    } catch (error) {
      return next(error);
    }
  }

  async putlocation(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { lat, lng, address } = req.body;
      console.log(req.body);

      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );
      if (!lat || !lng || !address)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const location = await this.storeaddloction.execute(
        id,
        lat,
        lng,
        address
      );

      return res
        .status(200)
        .json({ message: "success", success: true, location });
    } catch (error) {
      return next(error);
    }
  }

  async storeLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const storeToken = req.cookies.store_refreshToken;
      if (storeToken) res.clearCookie("store_refreshToken");

      return res.status(200).json({ success: true });
    } catch (error) {
      return next(error);
    }
  }

  async getStoreProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const product = await this.getproduct.execute(id);

      return res.status(200).json({ success: true, product });
    } catch (error) {
      return next(error);
    }
  }

  async putStoreProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, quantity, price, description, images, category } = req.body;
      if (!id)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const product = await this.putproduct.execute(
        id,
        name,
        quantity,
        price,
        description,
        images,
        category
      );
      return res.status(200).json({ success: true, product });
    } catch (error) {
      return next(error);
    }
  }

  async getstores20kmUsersdie(req: Request, res: Response, next: NextFunction) {
    try {
      const lat = parseFloat(req.query.lat as string);
      const lng = parseFloat(req.query.lng as string);

      if (!lat || !lng)
        return next(
          new CustomError("missing field", 401, AppError.ValidationError)
        );
      const stores = await this.store20km.execute(lat, lng);
      console.log(stores);

      return res.status(200).json({ success: true, stores });
    } catch (error) {
      return next(error);
    }
  }

  async getProductsByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );

      const products = await this.getStoreproducts.execute(id);

      return res.status(200).json({ success: true, products });
    } catch (error) {
      return next(error);
    }
  }
  async _getStorebyIdcontroll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );

      const store = await this.getStorebyId.execute(id);

      return res.status(200).json({ success: true, store });
    } catch (error) {
      return next(error);
    }
  }

  async _getordersbyStoreIdcontroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      if (!id)
        return next(
          new CustomError("missing id", 401, AppError.ValidationError)
        );
      const orders = await this.getOrdersbyStoreId.execute(id);
      return res.status(200).json({ success: true, orders });
    } catch (error) {
      return next(error);
    }
  }

  async _putOrdercompletecontroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const { status, concern } = req.body;

      if (!id)
        return next(
          new CustomError("missing id", 400, AppError.ValidationError)
        );
      if (!status)
        return next(
          new CustomError("missing field", 400, AppError.ValidationError)
        );
       

      const order = await this.putorderComplete.execute(id, status, concern);
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return next(error);
    }
  }
  async _getOrderDetailcontroll(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;


      if (!id)
        return next(
          new CustomError("missing id", 400, AppError.ValidationError)
        );
     ;
       

      const order = await this.getorderById.execute(id)
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return next(error);
    }
  }
}
