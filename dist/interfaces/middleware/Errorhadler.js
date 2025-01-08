"use strict";
// import { Request, Response, NextFunction } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_enum_1 = require("../../utils/errors/error.enum");
const custom_errors_1 = require("../../utils/errors/custom.errors");
const errorHandler = (err, req, res, next) => {
    console.error('Error stack:', err.stack);
    console.error('Error message:', err.message);
    if (err instanceof custom_errors_1.CustomError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
            code: err.errorCode,
        });
    }
    res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        code: error_enum_1.AppError.ServerError,
    });
};
exports.errorHandler = errorHandler;
