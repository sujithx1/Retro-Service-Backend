import admin from "./fireBaseAdmin";

export const notifySingleUser = async (token: string) => {
  const message = {
    token, // single recipient token
    notification: {
      title: "New Booking",
      body: "A new service has been booked!",
    },
    // Optional: include custom data payload
    // data: {
    //   bookingId: '123456',
    // },
  };

  try {
    const response = await admin.messaging().send(message);
    console.log(`✅ Notification sent successfully: ${response}`);
  } catch (error) {
    console.error("❌ Error sending notification:", error);
  }
};
