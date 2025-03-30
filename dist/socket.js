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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socket_Connection = void 0;
const app_1 = require("./app");
const ActivateModel_1 = require("./frameworks/db/models/ActivateModel");
const messageModel_1 = require("./frameworks/db/models/messageModel");
const activeUsers = new Map(); // userId -> socketId
const socket_Connection = () => {
    app_1.io.on("connection", (socket) => {
        console.log(`A user connected: ${socket.id}`);
        console.log(`Total connections: ${app_1.io.engine.clientsCount}`);
        socket.on("register", (userType, userId) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(`User registered: ${userType}, ID: ${userId}, Socket: ${socket.id}`);
            activeUsers.set(userId, socket.id);
            try {
                yield ActivateModel_1.ActiveConnection.findOneAndUpdate({ userType, userId }, { socketId: socket.id }, { upsert: true });
            }
            catch (error) {
                console.error("Error registering user:", error);
            }
        }));
        socket.on("markAsRead", (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver }) {
            console.log("✅ Marking messages as read...");
            try {
                yield messageModel_1.MessageModel.updateMany({ sender, receiver }, { $set: { isRead: true } });
                const senderSocketId = activeUsers.get(sender);
                if (senderSocketId) {
                    app_1.io.to(senderSocketId).emit("messagesRead", { sender });
                    console.log(`📢 Sent 'messagesRead' event to sender: ${senderSocketId}`);
                }
            }
            catch (error) {
                console.error("Error marking messages as read:", error);
            }
        }));
        socket.on('callData', ({ senderId, receiverId, callType }) => {
            console.log(senderId, receiverId, callType);
            const usersideId = activeUsers.get(senderId);
            console.log("userSocket ID", usersideId);
            console.log("Active users:", [...activeUsers.entries()]);
            console.log("All rooms:", app_1.io.sockets.adapter.rooms);
            if (usersideId) {
                app_1.io.to(usersideId).emit('callDetails', { senderId, receiverId, callType });
                console.log("sended call data", usersideId);
            }
        });
        socket.on("call", ({ senderId, senderName, receiverId, roomId, callType, senderProfilePic }) => {
            console.log("📞 Incoming Call Request:", { senderId, senderName, receiverId, callType });
            socket.join(roomId);
            const receiverSocketId = activeUsers.get(receiverId);
            if (receiverSocketId) {
                app_1.io.to(receiverSocketId).emit("callIncoming", { callType, senderId, roomId, senderName, senderProfilePic });
                console.log("📢 Call Incoming event emitted");
            }
        });
        socket.on("acceptCall", ({ roomId, employeeId }) => {
            console.log(`✅ Call Accepted in room: ${roomId}, Employee ID: ${employeeId}`);
            socket.join(roomId);
            console.log(`🔗 User joined room: ${roomId}`);
            setTimeout(() => {
                console.log(`📢 Emitting "callAccepted" to room: ${roomId}`);
                app_1.io.to(roomId).emit("callAccepted", { roomId, employeeId });
            }, 100);
        });
        socket.on('rejectCall', ({ roomId, senderId }) => {
            console.log(senderId, roomId);
            app_1.io.to(roomId).emit('rejected', { roomId, senderId });
        });
        socket.on("sendMessage", (_a) => __awaiter(void 0, [_a], void 0, function* ({ sender, receiver, message, userType, timestamp, status, attachment }) {
            console.log(`Message from ${sender} to ${receiver}: ${message}`);
            console.log(sender, receiver, message, userType, timestamp, status, attachment);
            try {
                const recipient = yield ActivateModel_1.ActiveConnection.findOne({ userType, userId: receiver });
                console.log(recipient);
                yield new messageModel_1.MessageModel({ sender, receiver, message, userType, attachment: attachment ? {
                        type: attachment.type,
                        url: attachment.url,
                        name: attachment.name,
                        size: attachment.size
                    } : undefined
                }).save();
                if (recipient) {
                    app_1.io.to(recipient.socketId).emit("chatMessage", { sender, message, timestamp, status, attachment, // Sending attachment data
                    });
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
        socket.on("newBooking", (booking) => {
            console.log("New Booking Request:", booking);
            app_1.io.emit("bookingNotification", booking);
        });
        socket.on("disconnect", (reason) => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const userId = (_a = [...activeUsers.entries()].find(([_, sid]) => sid === socket.id)) === null || _a === void 0 ? void 0 : _a[0];
            if (userId) {
                activeUsers.delete(userId);
                console.log(`User ${userId} removed.`);
            }
        }));
    });
};
exports.socket_Connection = socket_Connection;
