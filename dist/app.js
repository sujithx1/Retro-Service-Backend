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
const ActivateModel_1 = require("./frameworks/db/models/ActivateModel");
const messageModel_1 = require("./frameworks/db/models/messageModel");
const storeRoutes_1 = __importDefault(require("./frameworks/routes/storeRoutes"));
require("./utils/helper/db_helper/cronjobReject");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
};
const io = new socket_io_1.Server(server, {
    cors: corsOptions,
});
exports.io = io;
app.use((0, cors_1.default)(corsOptions)); // Ensure CORS is enabled for API routes
app.use(express_1.default.json({ limit: "20mb" }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
(0, connection_1.connectdb)(); // Ensure database connection
app.use((0, morgan_1.default)("dev"));
app.use("/api/user", userRoutes_1.default);
app.use("/api/employee", mechRoutes_1.default);
app.use("/api/admin", adminRouters_1.default);
app.use("/api/store", storeRoutes_1.default);
app.use(Errorhadler_1.errorHandler);
// Store the socket connections by user/employee IDs
let activeConnections = {};
// When a user or employee connects
io.on("connection", (socket) => {
    console.log("A user/employee connected");
    socket.on("register", (userType, userId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("message types connection", userType, userId);
        try {
            // Save or update active connection in the database
            yield ActivateModel_1.ActiveConnection.findOneAndUpdate({ userType, userId }, { socketId: socket.id }, { upsert: true });
            console.log(`User/Employee ${userId} registered as ${userType}`);
        }
        catch (error) {
            console.error("Error registering user/employee:", error);
        }
    }));
    socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver, message, userType, timestamp, status }) {
        console.log("message connnectin ", `
        from = ${sender},
        reciver  = ${receiver}  ,
        message = ${message}  , 
        usertype: ${userType} . 
        timestamp ${timestamp}`);
        try {
            // Fetch the recipient's socket ID from the database
            const recipient = yield ActivateModel_1.ActiveConnection.findOne({
                userType: userType,
                userId: receiver,
            });
            // Save the message in the database
            yield new messageModel_1.MessageModel({ sender, receiver, message, userType })
                .save();
            // await MessageModel.create({sender:sender,receiver:receiver,message:message,userType:userType})
            if (recipient) {
                // Send the message to the recipient if they're online
                io.to(recipient.socketId).emit("chatMessage", {
                    sender: sender,
                    message,
                    timestamp,
                    status
                });
                console.log("online", "user id", sender, "empId", receiver, "message", message);
            }
            else {
                console.log("offline", "user id", sender, "empId", receiver, "message", message);
                console.log(`Employee ${receiver} is not online.`);
            }
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    }));
    socket.on("newBooking", (booking) => {
        console.log("New Booking Request:", booking);
        io.emit("bookingNotification", booking); // Notify all clients
    });
    socket.on("disconnect", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Remove disconnected socket from active connections in the database
            yield ActivateModel_1.ActiveConnection.deleteOne({ socketId: socket.id });
            console.log(`Socket ${socket.id} disconnected`);
        }
        catch (error) {
            console.error("Error during disconnection:", error);
        }
    }));
});
exports.default = server;
