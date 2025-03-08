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
exports.WishlistController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class WishlistController {
    constructor(postwishlist, getwishlist_byuserId, deletewishlist) {
        this.postwishlist = postwishlist;
        this.getwishlist_byuserId = getwishlist_byuserId;
        this.deletewishlist = deletewishlist;
    }
    _postcreateWislist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId, userId } = req.body;
                console.log(req.body);
                if (!productId || !userId) {
                    return next(new custom_errors_1.CustomError("missing field", 400, error_enum_1.AppError.ValidationError));
                }
                const wishlist = yield this.postwishlist.execute(productId, userId);
                return res.status(201).json({ success: true, wishlist });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getwishlistsbyUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const {productId,userId}=req.body
                const { id } = req.params;
                if (!id) {
                    return next(new custom_errors_1.CustomError("missing userId", 400, error_enum_1.AppError.ValidationError));
                }
                const wishlists = yield this.getwishlist_byuserId.execute(id);
                return res.status(200).json({ success: true, wishlists });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _deletewishlistsbyId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const {productId,userId}=req.body
                const { id } = req.params;
                if (!id) {
                    return next(new custom_errors_1.CustomError("missing id", 400, error_enum_1.AppError.ValidationError));
                }
                const wishlist = yield this.deletewishlist.execute(id);
                return res.status(200).json({ success: true, wishlist });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.WishlistController = WishlistController;
