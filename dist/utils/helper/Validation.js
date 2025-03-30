"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category_Validation = exports.EmployeeSignupValidate = exports.loginValidates = exports.StoreSignupValidation = exports.UserValidation = void 0;
const custom_errors_1 = require("../errors/custom.errors");
const error_enum_1 = require("../errors/error.enum");
const UserValidation = (data) => {
    const { username, email, phone, password } = data;
    if (!username || !email || !phone || !password) {
        throw new Error("All field Required");
    }
    return true;
};
exports.UserValidation = UserValidation;
const StoreSignupValidation = (data) => {
    const { name, owner_email, owner_phone, owner_name, password } = data;
    if (!name || !owner_email || !owner_phone || !password || !owner_name) {
        throw new custom_errors_1.CustomError("All field Required", 401, error_enum_1.AppError.ValidationError);
    }
    return true;
};
exports.StoreSignupValidation = StoreSignupValidation;
const loginValidates = (email, password) => {
    if (!email || !password) {
        throw new Error("Missing Login field ");
    }
    return true;
};
exports.loginValidates = loginValidates;
const EmployeeSignupValidate = (data) => {
    const { username, email, phone, password, skills, experience, proof } = data;
    if (!username || !email || !phone || !password || !skills || !experience || !proof) {
        throw new Error("All field Required");
    }
    return true;
};
exports.EmployeeSignupValidate = EmployeeSignupValidate;
const category_Validation = (name, description, next) => {
    if (!name || !description) {
        next(new Error('All field is required'));
        return false;
    }
    return true;
};
exports.category_Validation = category_Validation;
