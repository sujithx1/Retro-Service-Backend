// common/errors/custom-error.ts
import { AppError } from "./error.enum"; // assuming the enum is in app-error.ts

export class CustomError extends Error {
    statusCode: number;
    errorCode: AppError;

    constructor(message: string, statusCode: number, errorCode: AppError) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
