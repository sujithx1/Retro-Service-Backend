// import { messaging } from "../../../firebase/fireBaseAdmin"; // Import Firebase Admin instance

// interface BookingDetails {
//   id: string;
//   service: string;
//   userFcmToken: string;
// }

// export const sendBookingNotification = async (booking: BookingDetails): Promise<void> => {
//   const message = {
//     notification: {
//       title: "📌 Booking Confirmed",
//       body: `Your booking for ${booking.service} is confirmed!`,
//     },
//     data: {
//       bookingId: booking.id, // Include booking ID in case frontend needs it
//       status: "confirmed",
//     },
//     token: booking.userFcmToken, // Send notification to the user's FCM token
//   };

//   try {
//     const response = await messaging.send(message);
//     console.log("✅ Notification sent successfully:", response);
//   } catch (error) {
//     console.error("❌ Error sending notification:", error);
//   }
// };
