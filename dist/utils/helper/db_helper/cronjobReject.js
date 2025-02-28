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
exports.stopBookingCronJob = exports.startBookingCronJob = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
const reqserviceMechanics_1 = require("../../../frameworks/db/models/reqserviceMechanics"); // Adjust path if needed
let bookingCronJob = null; // Store cron job reference
const startBookingCronJob = () => {
    if (bookingCronJob) {
        console.log("Cron job is already running.");
        return;
    }
    console.log("Starting cron job to auto-cancel pending bookings...");
    bookingCronJob = node_cron_1.default.schedule("* * * * *", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("Cron job triggered at:", new Date().toLocaleTimeString());
        const oneMinuteAgo = new Date(Date.now() - 50 * 1000); // 1 minute ago
        try {
            const expiredBookings = yield reqserviceMechanics_1.Request_Service_Mech_model.find({
                status: "PENDING",
                createdAt: { $lte: oneMinuteAgo }
            });
            console.log("Expired bookings to cancel:", expiredBookings.length);
            if (expiredBookings.length > 0) {
                const result = yield reqserviceMechanics_1.Request_Service_Mech_model.updateMany({ status: "PENDING", createdAt: { $lte: oneMinuteAgo } }, { $set: { status: "REJECT" } });
                console.log(`Cancelled ${result.modifiedCount} expired bookings.`);
            }
            const pendingBookings = yield reqserviceMechanics_1.Request_Service_Mech_model.countDocuments({ status: "PENDING" });
            if (pendingBookings === 0) {
                console.log("No more pending bookings, stopping cron job temporarily.");
                (0, exports.stopBookingCronJob)();
            }
        }
        catch (error) {
            console.error("Error updating pending requests:", error);
        }
    }));
    bookingCronJob.start(); // Ensure cron starts
};
exports.startBookingCronJob = startBookingCronJob;
const stopBookingCronJob = () => {
    if (bookingCronJob) {
        console.log("Stopping cron job.");
        bookingCronJob.stop();
        bookingCronJob = null;
    }
};
exports.stopBookingCronJob = stopBookingCronJob;
