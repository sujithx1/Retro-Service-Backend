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
const activeUsers = new Map(); // userId -> socketId
const roomPeers = {};
const roomAnswer = {};
io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);
    console.log(`Total connections: ${io.engine.clientsCount}`);
    // 🔹 Register user with socket ID
    socket.on("register", (userType, userId) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User registered: ${userType}, ID: ${userId}, Socket: ${socket.id}`);
        // Store in activeUsers map
        activeUsers.set(userId, socket.id);
        try {
            // Store in database
            yield ActivateModel_1.ActiveConnection.findOneAndUpdate({ userType, userId }, { socketId: socket.id }, { upsert: true });
        }
        catch (error) {
            console.error("Error registering user:", error);
        }
    }));
    // Handle call initiation
    // Handle Call Request
    socket.on('callData', ({ senderId, receiverId, callType }) => {
        console.log(senderId, receiverId, callType);
        const usersideId = activeUsers.get(senderId);
        console.log("userSocket ID", usersideId);
        console.log("Active users:", [...activeUsers.entries()]);
        console.log("All rooms:", io.sockets.adapter.rooms);
        if (usersideId) {
            io.to(usersideId).emit('callDetails', { senderId, receiverId, callType });
            console.log("sended call data", usersideId);
        }
    });
    socket.on("call", ({ senderId, senderName, receiverId, roomId, callType }) => {
        console.log("📞 Incoming Call Request:", { senderId, senderName, receiverId, callType });
        socket.join(roomId);
        const receiverSocketId = activeUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("callIncoming", { callType, senderId, roomId, senderName });
            console.log("📢 Call Incoming event emitted");
        }
    });
    // Handle Call Acceptance
    socket.on("acceptCall", ({ roomId, employeeId }) => {
        console.log(`✅ Call Accepted in room: ${roomId}, Employee ID: ${employeeId}`);
        socket.join(roomId); // Ensure user joins the room
        console.log(`🔗 User joined room: ${roomId}`);
        setTimeout(() => {
            console.log(`📢 Emitting "callAccepted" to room: ${roomId}`);
            io.to(roomId).emit("callAccepted", { roomId, employeeId });
        }, 100); // Small delay to ensure room join
    });
    socket.on('rejectCall', ({ roomId, senderId }) => {
        console.log(senderId, roomId);
        io.to(roomId).emit('rejected', { roomId, senderId });
    });
    // 🔹 Handle Messages (Fixed)
    socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver, message, userType, timestamp, status }) {
        console.log(`Message from ${sender} to ${receiver}: ${message}`);
        try {
            // Get recipient socket from DB
            const recipient = yield ActivateModel_1.ActiveConnection.findOne({ userType, userId: receiver });
            // Save message in DB
            yield new messageModel_1.MessageModel({ sender, receiver, message, userType }).save();
            if (recipient) {
                io.to(recipient.socketId).emit("chatMessage", { sender, message, timestamp, status });
                console.log(`Message sent to ${receiver} (Socket: ${recipient.socketId})`);
            }
            else {
                console.log(`User ${receiver} is offline.`);
            }
        }
        catch (error) {
            console.error("Error sending message:", error);
        }
    }));
    // 🔹 New Booking Notification
    socket.on("newBooking", (booking) => {
        console.log("New Booking Request:", booking);
        io.emit("bookingNotification", booking);
    });
    // 🔹 Handle disconnection (Fixed)
    socket.on("disconnect", (reason) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const userId = (_a = [...activeUsers.entries()].find(([_, sid]) => sid === socket.id)) === null || _a === void 0 ? void 0 : _a[0];
        if (userId) {
            activeUsers.delete(userId);
            console.log(`User ${userId} removed.`);
        }
    }));
});
exports.default = server;
