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
exports.CheckoutController = void 0;
const custom_errors_1 = require("../../../utils/errors/custom.errors");
const error_enum_1 = require("../../../utils/errors/error.enum");
class CheckoutController {
    constructor(postcheckout, getordersByuserId, getorderbyId, putOrder) {
        this.postcheckout = postcheckout;
        this.getordersByuserId = getordersByuserId;
        this.getorderbyId = getorderbyId;
        this.putOrder = putOrder;
    }
    _postCheckout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cartId, total, paymentMethode, transactionId } = req.body;
                console.log(req.body);
                if (!cartId || !total || !paymentMethode || !transactionId)
                    return next(new custom_errors_1.CustomError("missing field", 401, error_enum_1.AppError.ValidationError));
                const checkout = yield this.postcheckout.execute(cartId, Number(total), paymentMethode, transactionId);
                return res.status(201).json({ success: true, checkout });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getOrdersbyUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const orders = yield this.getordersByuserId.execute(id);
                return res.status(200).json({ success: true, orders });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _getOrdersbyId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 401, error_enum_1.AppError.ValidationError));
                const order = yield this.getorderbyId.execute(id);
                return res.status(200).json({ success: true, order });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    _putOrdercancellReject(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(req.body);
                const { status, concern } = req.body;
                if (!id)
                    return next(new custom_errors_1.CustomError("missing id", 400, error_enum_1.AppError.ValidationError));
                if (!status)
                    return next(new custom_errors_1.CustomError("missing field", 400, error_enum_1.AppError.ValidationError));
                if (status === "rejected" && !concern) {
                    return next(new custom_errors_1.CustomError("missing concern", 400, error_enum_1.AppError.ValidationError));
                }
                const order = yield this.putOrder.execute(id, status, concern);
                return res.status(200).json({ success: true, order });
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.CheckoutController = CheckoutController;
