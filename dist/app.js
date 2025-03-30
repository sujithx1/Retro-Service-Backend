"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = require("./frameworks/db/connection");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userRoutes_1 = __importDefault(require("./frameworks/routes/userRoutes"));
const adminRouters_1 = __importDefault(require("./frameworks/routes/adminRouters"));
const mechRoutes_1 = __importDefault(require("./frameworks/routes/mechRoutes"));
const Errorhadler_1 = require("./interfaces/middleware/Errorhadler");
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const morgan_1 = __importDefault(require("morgan"));
const storeRoutes_1 = __importDefault(require("./frameworks/routes/storeRoutes"));
require("./utils/helper/db_helper/cronjobReject");
const socket_1 = require("./socket");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: process.env.CLEINT_URL,
    // origin:'https://retro-service.vercel.app',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
exports.io = new socket_io_1.Server(server, {
    cors: corsOptions,
});
(0, socket_1.socket_Connection)();
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json({ limit: "20mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
(0, connection_1.connectdb)();
app.use((0, morgan_1.default)("dev"));
app.use("/api/user", userRoutes_1.default);
app.use("/api/employee", mechRoutes_1.default);
app.use("/api/admin", adminRouters_1.default);
app.use("/api/store", storeRoutes_1.default);
app.use(Errorhadler_1.errorHandler);
exports.default = server;
