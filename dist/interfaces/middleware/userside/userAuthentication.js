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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../../../frameworks/db/models/UserModel");
const EmployeeModel_1 = require("../../../frameworks/db/models/EmployeeModel");
const jwtSecret = process.env.access_token || "";
// declare global{
//     namespace Express {
//         interface Request{
//             user?:UserIntities,
//             employee?:EmployeeEntities,
//             admin?:UserIntities
//         }
//     }
// }
// export const Authentication = async (req: Request, res: Response, next: NextFunction) => {
//     console.log('user authentication');
//     try {
//         let token = req.header('Authorization')?.replace('Bearer ', "").trim();
//         console.log("userside auth", token);
//         if (!token) {
//             console.log('no user token');
//             return res.status(401).json({ error: 'Access denied' });
//         }
//         const decoded = Jwt.verify(token, jwtSecret) as JwtPayload & { id: string, role: string };
//         console.log("decode ", decoded);
//         if (!decoded || !decoded.id || !decoded.role) {
//             return res.status(403).json({ error: "Invalid token payload" });
//         }
//         const { id, role } = decoded;
//         if (role === "user") {
//             const user = await UserModel.findById(id).select("-password");
//             console.log("user ");
//             if (!user || !user.isActive) {
//                 return res.status(401).json({ error: "User not found or inactive" });
//             }
//             // return req.user = new UserIntities(
//             //     user._id.toString(),
//             //     user.username,
//             //     user.email,
//             //     user.phone,
//             //     user.password,
//             //     user.isActive,
//             //     user.profilePic,
//             //     user.isAdmin,
//             //     user.authSource,
//             //     user.role,
//             //     user.createdAt,
//             //     user.updatedAt
//             // );
//         } else if (role === "employee") {
//             const employee = await EmployeeModel.findById(id).select("-password");
//             if (!employee || !employee.isActive) {
//                 return res.status(401).json({ error: "Employee not found or inactive" });
//             }
//         //   return  req.employee = new EmployeeEntities(
//         //         employee.id,
//         //         employee.username,
//         //         employee.email,
//         //         employee.phone,
//         //         employee.password,
//         //         employee.skills,
//         //         employee.experience,
//         //         employee.isActive,
//         //         employee.profilePic,
//         //         employee.location,
//         //         employee.authSource,
//         //         employee.role,
//         //         employee.createdAt,
//         //         employee.updatedAt
//         //     );
//         } else if (role === "admin") {
//             const user = await UserModel.findById(id).select("-password");
//             if (!user || !user.isAdmin) {
//                 return res.status(403).json({ error: "Not an admin or invalid user" });
//             }
//         //    return req.admin = new UserIntities(
//         //         user._id.toString(),
//         //         user.username,
//         //         user.email,
//         //         user.phone,
//         //         user.password,
//         //         user.isActive,
//         //         user.profilePic,
//         //         user.isAdmin,
//         //         user.authSource,
//         //         user.role,
//         //         user.createdAt,
//         //         user.updatedAt
//         //     );
//         } else {
//             return res.status(403).json({ error: "Invalid role in token" });
//         }
//         next();
//     } catch (error: any) {
//         console.error("Authentication error:", error.message); // Log for debugging
//         return res.status(401).json({ error: error.mesage });
//     }
// };
const Authentication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', "").trim();
        if (!token) {
            res.status(401).json({ error: 'Access denied' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
        if (!decoded || !decoded.id || !decoded.role) {
            res.status(403).json({ error: "Invalid token payload" });
            return;
        }
        const { id, role } = decoded;
        if (role === "user") {
            const user = yield UserModel_1.UserModel.findById(id).select("-password");
            if (!user || !user.isActive) {
                res.status(401).json({ error: "User not found or inactive" });
                return;
            }
        }
        else if (role === "employee") {
            const employee = yield EmployeeModel_1.EmployeeModel.findById(id).select("-password");
            if (!employee || !employee.isActive) {
                res.status(401).json({ error: "Employee not found or inactive" });
                return;
            }
        }
        else if (role === "admin") {
            const user = yield UserModel_1.UserModel.findById(id).select("-password");
            if (!user || !user.isAdmin) {
                res.status(403).json({ error: "Not an admin or invalid user" });
                return;
            }
        }
        else {
            res.status(403).json({ error: "Invalid role in token" });
            return;
        }
        next(); // Proceed to the next middleware/handler
    }
    catch (error) {
        console.error("Authentication error:", error.message);
        res.status(401).json({ error: error.message });
    }
});
exports.Authentication = Authentication;
