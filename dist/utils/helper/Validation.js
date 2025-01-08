"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.category_Validation = exports.EmployeeSignupValidate = exports.loginValidates = exports.UserValidation = void 0;
const UserValidation = (data) => {
    const { username, email, phone, password } = data;
    if (!username || !email || !phone || !password) {
        throw new Error("All field Required");
    }
    return true;
};
exports.UserValidation = UserValidation;
const loginValidates = (email, password) => {
    if (!email || !password) {
        throw new Error("Missing Login field ");
    }
    return true;
};
exports.loginValidates = loginValidates;
const EmployeeSignupValidate = (data) => {
    const { username, email, phone, password, skills, experience } = data;
    if (!username || !email || !phone || !password || !skills || !experience) {
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
