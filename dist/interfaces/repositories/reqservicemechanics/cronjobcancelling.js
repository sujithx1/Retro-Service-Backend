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
        console.log("Checking for expired pending requests...");
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // 1 minute ago
        try {
            const result = yield reqserviceMechanics_1.Request_Service_Mech_model.updateMany({ status: "PENDING", createdAt: { $lte: oneMinuteAgo } }, // Find pending bookings older than 1 min
            { $set: { status: "REJECT" } });
            if (result.modifiedCount > 0) {
                console.log(`Cancelled ${result.modifiedCount} expired bookings.`);
            }
            // Check if there are any remaining pending bookings
            const pendingBookings = yield reqserviceMechanics_1.Request_Service_Mech_model.countDocuments({ status: "PENDING" });
            if (pendingBookings === 0) {
                (0, exports.stopBookingCronJob)(); // Stop the cron job if no pending bookings exist
            }
        }
        catch (error) {
            console.error("Error updating pending requests:", error);
        }
    }));
};
exports.startBookingCronJob = startBookingCronJob;
const stopBookingCronJob = () => {
    if (bookingCronJob) {
        console.log("Stopping cron job as no pending bookings exist.");
        bookingCronJob.stop();
        bookingCronJob = null;
    }
};
exports.stopBookingCronJob = stopBookingCronJob;
