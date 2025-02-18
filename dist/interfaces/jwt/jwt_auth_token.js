"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.GenerateRefreshToken = exports.GenerateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccessToken_secretKey = process.env.ACCESS_TOKEN || "";
const RefreshToken_secretKey = process.env.REFRESH_TOKEN || "";
const GenerateAccessToken = (id, role) => {
    return jsonwebtoken_1.default.sign({ id, role }, AccessToken_secretKey, {
        expiresIn: "24h",
        algorithm: "HS256",
    });
};
exports.GenerateAccessToken = GenerateAccessToken;
// Function to generate refresh tokens
const GenerateRefreshToken = (id, role) => {
    const refresh = jsonwebtoken_1.default.sign({ id, role }, RefreshToken_secretKey, {
        expiresIn: "7d",
    });
    console.log("Generated Refresh Token:", refresh);
    return refresh;
};
exports.GenerateRefreshToken = GenerateRefreshToken;
// Function to remove expired refresh tokens (optional)
// Endpoint to create a new access token using a refresh token
const createAccessToken = (req, res, role) => {
    console.log(role);
    const roleToken = `${role}_refreshToken`;
    console.log(roleToken);
    const refreshtoken = req.cookies[roleToken];
    console.log("tokennnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn", refreshtoken);
    // console.log(refreshtoken,"refffffffffffffffffffffffff");
    // Check if the refresh token exists and is valid
    if (!refreshtoken) {
        res.status(403).json({ error: "Refresh token is invalid or missing" });
        return;
    }
    // Verify the refresh token
    jsonwebtoken_1.default.verify(refreshtoken, RefreshToken_secretKey, (err, decoded) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                res.status(403).json({ error: "Refresh token expired" });
                return;
            }
            res.status(403).json({ error: "Token verification failed" });
            return;
        }
        if (typeof decoded === "object" && decoded !== null) {
            const { id, role } = decoded;
            if (!id || !role) {
                res.status(403).json({ error: "Invalid payload in token" });
                return;
            }
            // Generate a new access token
            const newAccessToken = (0, exports.GenerateAccessToken)(id, role);
            console.log("accesssssssssssssssssssssss", newAccessToken);
            res.status(200).json({ accessToken: newAccessToken });
            return;
        }
        res.status(403).json({ error: "Invalid token" });
        return;
    });
};
exports.createAccessToken = createAccessToken;
