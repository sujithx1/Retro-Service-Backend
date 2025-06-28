"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreController = void 0;
const Validation_1 = require("../../../utils/helper/Validation");
const otp_1 = require("../../../utils/otp");
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
const jwt_auth_token_1 = require("../../jwt/jwt_auth_token");
class StoreController {
    constructor(sendMails, checkOtp, storelogin, addproduct, allproduts, storeaddloction, getproduct, putproduct, store20km, getStoreproducts, getStorebyId, getOrdersbyStoreId, putorderComplete, getorderById, getWalletbyStoreId) {
        this.sendMails = sendMails;
        this.checkOtp = checkOtp;
        this.storelogin = storelogin;
        this.addproduct = addproduct;
        this.allproduts = allproduts;
        this.storeaddloction = storeaddloction;
        this.getproduct = getproduct;
        this.putproduct = putproduct;
        this.store20km = store20km;
        this.getStoreproducts = getStoreproducts;
        this.getStorebyId = getStorebyId;
        this.getOrdersbyStoreId = getOrdersbyStoreId;
        this.putorderComplete = putorderComplete;
        this.getorderById = getorderById;
        this.getWalletbyStoreId = getWalletbyStoreId;
    }
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, owner_email, owner_name, password, owner_phone } = req.body;
                const userData = { name, owner_email, owner_name, owner_phone, password };
                (0, Validation_1.StoreSignupValidation)({
                    name,
                    owner_email,
                    owner_phone,
                    owner_name,
                    password,
                });
                const otp = (0, otp_1.generate_otp)();
                console.log("otp", otp);
                const storeOwner = yield this.sendMails.execute(name, otp, userData);
                res
                    .status(200)
                    .json({ message: "Enter Otp check your Email", storeOwner });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    Otp_checkingController(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { otp } = req.body;
                console.log("otp checking", otp);
                if (!otp)
                    throw new Error("Enter Otp");
                console.log(otp);
                const store = yield this.checkOtp.execute(Number(otp));
                res.status(201).json({ message: "success", store });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId, password } = req.body;
                if (!storeId || !password)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const store = yield this.storelogin.execute(storeId, password);
                const access_token = yield (0, jwt_auth_token_1.GenerateAccessToken)(store.id, "store");
                const refresh_token = yield (0, jwt_auth_token_1.GenerateRefreshToken)(store.id, "store");
                // const { password: _, ...withoutPassword } = store;
                return res
                    .cookie("store_refreshToken", refresh_token, {
                    httpOnly: true,
                })
                    .status(200)
                    .json({ success: true, store, token: access_token });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    Add_product(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, quantity, price, description, images, storeId, category } = req.body;
                console.log("add product", req.body);
                if (!name ||
                    !quantity ||
                    !price ||
                    !description ||
                    !images ||
                    !storeId ||
                    !category)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const product = yield this.addproduct.execute(storeId, name, quantity, price, description, images, category);
                return res.status(201).json({ success: true, product });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getAllproducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.allproduts.execute();
                console.log(products);
                return res.status(200).json({ success: true, products });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    putlocation(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { lat, lng, address } = req.body;
                console.log(req.body);
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                if (!lat || !lng || !address)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const location = yield this.storeaddloction.execute(id, lat, lng, address);
                return res
                    .status(200)
                    .json({ message: "success", success: true, location });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    storeLogout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const storeToken = req.cookies.store_refreshToken;
                if (storeToken)
                    res.clearCookie("store_refreshToken");
                return res.status(200).json({ success: true });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getStoreProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const product = yield this.getproduct.execute(id);
                return res.status(200).json({ success: true, product });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    putStoreProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, quantity, price, description, images, category } = req.body;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const product = yield this.putproduct.execute(id, name, quantity, price, description, images, category);
                return res.status(200).json({ success: true, product });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getstores20kmUsersdie(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lat = parseFloat(req.query.lat);
                const lng = parseFloat(req.query.lng);
                if (!lat || !lng)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const stores = yield this.store20km.execute(lat, lng);
                console.log(stores);
                return res.status(200).json({ success: true, stores });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getProductsByStore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const products = yield this.getStoreproducts.execute(id);
                return res.status(200).json({ success: true, products });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getStorebyIdcontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const store = yield this.getStorebyId.execute(id);
                return res.status(200).json({ success: true, store });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getordersbyStoreIdcontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const orders = yield this.getOrdersbyStoreId.execute(id);
                return res.status(200).json({ success: true, orders });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _putOrdercompletecontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status, concern } = req.body;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 400, error_enum_1.AppError.ValidationError));
                if (!status)
                    return next(new custom_errors_1.CustomError("missing field", 400, error_enum_1.AppError.ValidationError));
                const order = yield this.putorderComplete.execute(id, status, concern);
                return res.status(200).json({ success: true, order });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getOrderDetailcontroll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 400, error_enum_1.AppError.ValidationError));
                const order = yield this.getorderById.execute(id);
                return res.status(200).json({ success: true, order });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getWalletsbyStoreIdcontroller(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 400, error_enum_1.AppError.ValidationError));
                const wallet = yield this.getWalletbyStoreId.execute(id);
                return res.status(200).json({ success: true, wallet });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.StoreController = StoreController;
