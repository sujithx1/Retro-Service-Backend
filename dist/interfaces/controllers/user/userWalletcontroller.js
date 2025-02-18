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
exports.UserwalletController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class UserwalletController {
    constructor(getuserWallet) {
        this.getuserWallet = getuserWallet;
    }
    user_getwalletbyuserId_controller(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("id missing ", 401, error_enum_1.AppError.ValidationError));
                const wallet = yield this.getuserWallet.execute(id);
                return res.status(200).json({
                    message: 'success', success: true, wallet
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.UserwalletController = UserwalletController;
