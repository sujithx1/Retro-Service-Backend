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
exports.Message_mongoRepositories = void 0;
const chatEntities_1 = require("../../../entities/chatEntities");
const messageModel_1 = require("../../../frameworks/db/models/messageModel");
class Message_mongoRepositories {
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield messageModel_1.MessageModel.findById(id);
            if (!chat)
                return null;
            return new chatEntities_1.MessageEntites(chat.id, chat.sender, chat.receiver, chat.message, chat.userType, chat.timestamp, chat.isRead, chat.attachment);
        });
    }
    getMessages(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messageModel_1.MessageModel.find({ sender, receiver }).sort({ timestamp: 1 });
            return messages.map((item) => new chatEntities_1.MessageEntites(item.id, item.sender, item.receiver, item.message, item.userType, item.timestamp, item.isRead, item.attachment));
        });
    }
    markMessagesAsRead(sender, receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            yield messageModel_1.MessageModel.updateMany({ sender, receiver, isRead: false }, { isRead: true });
        });
    }
    getMessagesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messageModel_1.MessageModel.find({
                $or: [
                    { sender: userId },
                    { receiver: userId }
                ]
            });
            return messages.map((item) => new chatEntities_1.MessageEntites(item.id, item.sender.toString(), item.receiver.toString(), item.message, item.userType, item.timestamp, item.isRead, item.attachment));
        });
    }
    getMessagesByEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield messageModel_1.MessageModel.find({
                $or: [
                    { sender: employeeId },
                    { receiver: employeeId }
                ]
            });
            return messages.map((item) => new chatEntities_1.MessageEntites(item.id, item.sender, item.receiver, item.message, item.userType, item.timestamp, item.isRead, item.attachment));
        });
    }
}
exports.Message_mongoRepositories = Message_mongoRepositories;
