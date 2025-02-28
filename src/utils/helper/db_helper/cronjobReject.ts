import cron from "node-cron";
import { Request_Service_Mech_model } from "../../../frameworks/db/models/reqserviceMechanics"; // Adjust path if needed

let bookingCronJob: cron.ScheduledTask | null = null; // Store cron job reference

export const startBookingCronJob = () => {
  if (bookingCronJob) {
    console.log("Cron job is already running.");
    return;
  }

  console.log("Starting cron job to auto-cancel pending bookings...");
  bookingCronJob = cron.schedule("* * * * *", async () => {
    console.log("Cron job triggered at:", new Date().toLocaleTimeString()); 

    const oneMinuteAgo = new Date(Date.now() - 50  * 1000); // 1 minute ago

    try {
      const expiredBookings = await Request_Service_Mech_model.find({
        status: "PENDING",
        createdAt: { $lte: oneMinuteAgo }
      });

      console.log("Expired bookings to cancel:", expiredBookings.length);

      if (expiredBookings.length > 0) {
        const result = await Request_Service_Mech_model.updateMany(
          { status: "PENDING", createdAt: { $lte: oneMinuteAgo } },
          { $set: { status: "REJECT" } }
        );

        console.log(`Cancelled ${result.modifiedCount} expired bookings.`);
      }


      const pendingBookings = await Request_Service_Mech_model.countDocuments({ status: "PENDING" });

if (pendingBookings === 0) {
  console.log("No more pending bookings, stopping cron job temporarily.");
  stopBookingCronJob();
     
}
    } catch (error) {
      console.error("Error updating pending requests:", error);
    }
  });

  bookingCronJob.start(); // Ensure cron starts
};

export const stopBookingCronJob = () => {
  if (bookingCronJob) {
    console.log("Stopping cron job.");
    bookingCronJob.stop();
    bookingCronJob = null;
  }
};
