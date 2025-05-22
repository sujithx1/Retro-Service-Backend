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
exports.CartController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class CartController {
    constructor(newCart, updatedcart, cartbyUserId, getcartbyProductId, deletecartuseingId, getBIcartId) {
        this.newCart = newCart;
        this.updatedcart = updatedcart;
        this.cartbyUserId = cartbyUserId;
        this.getcartbyProductId = getcartbyProductId;
        this.deletecartuseingId = deletecartuseingId;
        this.getBIcartId = getBIcartId;
    }
    addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { storeId, productId, quantity, price, userId } = req.body;
                if (!storeId || !productId || !price || !quantity || !userId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.newCart.execute(userId, storeId, productId, quantity, price);
                return res.status(201).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    updateAddtocart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { id, storeId, productId, quantity, price, userId } = req.body;
                if (!id || !storeId || !productId || !price || !quantity || !userId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.updatedcart.execute(id, userId, storeId, productId, quantity, price);
                return res.status(200).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    getcartbyUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                if (!userId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.cartbyUserId.execute(userId);
                return res.status(200).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getcartbyproductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { productId } = req.params;
                if (!productId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.getcartbyProductId.execute(productId);
                return res.status(200).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _deletecartId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { productId } = req.body;
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                if (!productId)
                    return next(new custom_errors_1.CustomError("missing productId", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.deletecartuseingId.execute(id, productId);
                return res.status(200).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getBycartId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const cart = yield this.getBIcartId.execute(id);
                return res.status(200).json({ success: true, cart });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.CartController = CartController;
