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
exports.EmployeeModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const AddressSchema = new mongoose_1.Schema({
    country: { type: String, required: true },
    county: { type: String, required: false },
    neighbourhood: { type: String, required: false },
    postcode: { type: String, required: false },
    road: { type: String, required: false },
    state: { type: String, required: true },
    state_district: { type: String, required: false },
    suburb: { type: String, required: false },
    town: { type: String, required: false },
});
// Location Schema
const LocationSchema = new mongoose_1.Schema({
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: AddressSchema, required: true },
});
const EmployeSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        unique: true,
    },
    experience: {
        type: Number,
        required: true
    },
    profilePic: {
        type: String,
        default: ""
    },
    location: {
        type: LocationSchema,
        required: false
    },
    authSource: {
        type: String,
        enum: ["self", "google"],
        default: "self"
    },
    role: {
        type: String,
        default: "employee"
    },
    revenue: {
        type: Number,
        default: 0
    },
    onDuty: {
        type: Boolean,
        default: false
    },
    proof: {
        type: String,
        required: true
    },
    isValidated: {
        type: Boolean,
        default: false
    },
    FCM_Token: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});
exports.EmployeeModel = mongoose_1.default.model("employee", EmployeSchema);
