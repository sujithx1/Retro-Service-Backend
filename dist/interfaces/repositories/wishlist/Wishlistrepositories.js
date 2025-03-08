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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistMongoRepository = void 0;
const wishlistEntities_1 = require("../../../entities/wishlistEntities");
const wishlistModel_1 = __importDefault(require("../../../frameworks/db/models/wishlistModel"));
const returnWishlist = (wishlist) => {
    return new wishlistEntities_1.WishlistEntity(wishlist.id, wishlist.userId, wishlist.productId, wishlist.createdAt, wishlist.updatedAt);
};
class WishlistMongoRepository {
    addToWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlistItem = yield wishlistModel_1.default.create({ userId, productId });
            yield wishlistItem.populate("userId", "username email phone");
            yield wishlistItem.populate("productId", "name images price");
            return returnWishlist(wishlistItem);
        });
    }
    removeFromWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield wishlistModel_1.default.findOneAndDelete({ userId, productId });
            return !!result;
        });
    }
    deletewishlist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield wishlistModel_1.default.findByIdAndDelete(id);
            return result === null || result === void 0 ? void 0 : result.id;
        });
    }
    getWishlistByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const wishlist = yield wishlistModel_1.default.find({ userId })
                .populate("userId", "username email phone") // Populating user details
                .populate("productId", "name images price") // Populating user details
                .exec();
            return wishlist.map(item => returnWishlist(item));
        });
    }
}
exports.WishlistMongoRepository = WishlistMongoRepository;
