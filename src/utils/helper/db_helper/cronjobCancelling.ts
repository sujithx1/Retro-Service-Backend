import cron from "node-cron";
import { Request_Service_Mech_model } from "../../../frameworks/db/models/reqserviceMechanics"; // Adjust path if needed

let bookingCronJob: cron.ScheduledTask | null = null; // Store cron job reference

export const startBookingCronJob3min = () => {
  if (bookingCronJob) {
    console.log("Cron job is already running.");
    return;
  }

  console.log("Starting cron job to auto-cancel pending bookings...");
  bookingCronJob = cron.schedule("* * * * *", async () => {
    console.log("Checking for expired pending requests...");
    const threeMinutesAgo = new Date(Date.now() - (3 * 60 * 1000));

    try {
      const result = await Request_Service_Mech_model.updateMany(
        { status: "PENDING", createdAt: { $lte: threeMinutesAgo } }, // Find pending bookings older than 1 min
        { $set: { status: "CANCELLED" } }
      );

      if (result.modifiedCount > 0) {
        console.log(`Cancelled ${result.modifiedCount} expired bookings.`);
      }

      // Check if there are any remaining pending bookings
      const pendingBookings = await Request_Service_Mech_model.countDocuments({ status: "PENDING" });
      if (pendingBookings === 0) {
        stopBookingCronJob(); // Stop the cron job if no pending bookings exist
      }
    } catch (error) {
      console.error("Error updating pending requests:", error);
    }
  });
};

export const stopBookingCronJob = () => {
  if (bookingCronJob) {
    console.log("Stopping cron job as no pending bookings exist.");
    bookingCronJob.stop();
    bookingCronJob = null;
  }
};
