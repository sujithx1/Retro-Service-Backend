"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
var AppError;
(function (AppError) {
    AppError["UserNotFound"] = "UserNotFound";
    AppError["InvalidCredentials"] = "InvalidCredentials";
    AppError["OtpExpired"] = "OtpExpired";
    AppError["OtpMismatch"] = "OtpMismatch";
    AppError["EmailAlreadyInUse"] = "EmailAlreadyInUse";
    AppError["ValidationError"] = "ValidationError";
    AppError["ServerError"] = "ServerError";
    AppError["UnauthorizedAccess"] = "UnauthorizedAccess";
    AppError["ResourceNotFound"] = "ResourceNotFound";
    AppError["DuplicateError"] = "Duplicate Entry";
    AppError["PasswordNotmatch"] = "Password Not Match";
})(AppError || (exports.AppError = AppError = {}));
