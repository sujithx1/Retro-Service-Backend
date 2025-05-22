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
exports.Orders_getuserIduseCase = void 0;
// import { CustomError } from "../../../utils/errors/custom.errors";
// import { AppError } from "../../../utils/errors/error.enum";
class Orders_getuserIduseCase {
    constructor(checkoutrepositoires) {
        this.checkoutrepositoires = checkoutrepositoires;
    }
    execute(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield this.checkoutrepositoires.findByuserId(userId);
            // if(orders.lengt./h==0)throw new CustomError("Please Order ",404,AppError.ResourceNotFound)
            return orders;
        });
    }
}
exports.Orders_getuserIduseCase = Orders_getuserIduseCase;
