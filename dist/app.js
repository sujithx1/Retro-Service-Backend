"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./frameworks/db/connection");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./frameworks/routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
(0, connection_1.connectdb)();
app.use('/api/user', userRoutes_1.default);
exports.default = app;
