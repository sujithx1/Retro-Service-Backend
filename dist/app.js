"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./frameworks/db/connection");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./frameworks/routes/userRoutes"));
const adminRouters_1 = __importDefault(require("./frameworks/routes/adminRouters"));
const empRoutes_1 = __importDefault(require("./frameworks/routes/empRoutes"));
const Errorhadler_1 = require("./interfaces/middleware/Errorhadler");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use(express_1.default.json({
    limit: "20mb"
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
};
app.use((0, cors_1.default)(corsOptions));
(0, connection_1.connectdb)();
app.use((0, morgan_1.default)('dev'));
app.use('/api/user', userRoutes_1.default);
app.use('/api/employee', empRoutes_1.default);
app.use('/api/admin', adminRouters_1.default);
app.use(Errorhadler_1.errorHandler);
exports.default = app;
