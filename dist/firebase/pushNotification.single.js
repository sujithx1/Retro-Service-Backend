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
exports.notifySingleUser = void 0;
const fireBaseAdmin_1 = __importDefault(require("./fireBaseAdmin"));
const notifySingleUser = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const message = {
        token, // single recipient token
        notification: {
            title: 'New Booking',
            body: 'A new service has been booked!',
        },
        // Optional: include custom data payload
        // data: {
        //   bookingId: '123456',
        // },
    };
    try {
        const response = yield fireBaseAdmin_1.default.messaging().send(message);
        console.log(`✅ Notification sent successfully: ${response}`);
    }
    catch (error) {
        console.error('❌ Error sending notification:', error);
    }
});
exports.notifySingleUser = notifySingleUser;
