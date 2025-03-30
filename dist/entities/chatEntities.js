"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEntites = void 0;
class MessageEntites {
    constructor(id, sender, receiver, message, userType, timestamp, isRead, attachment) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.userType = userType;
        this.timestamp = timestamp;
        this.isRead = isRead;
        this.attachment = attachment;
    }
}
exports.MessageEntites = MessageEntites;
