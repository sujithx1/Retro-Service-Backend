"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request_Service_Mech_model = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const requestSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String, required: true }
    },
    jobId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Jobs",
        required: true,
    },
    jobName: { type: String, required: true },
    minWage: { type: Number, required: true },
    problem: { type: String, required: true },
    status: {
        type: String,
        enum: ["PENDING", "CONFIRMED", "CANCELLED", "COMPLETED"],
        default: "PENDING",
    },
    mechanics: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "employee",
        },
    ],
    bookingDate: { type: Date, required: true },
    acceptEmployee: {
        employeeId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "employee",
            default: null,
        },
        acceptTime: {
            type: Date,
            default: null,
        },
    },
});
exports.Request_Service_Mech_model = mongoose_1.default.model('RequestMechanics', requestSchema);
