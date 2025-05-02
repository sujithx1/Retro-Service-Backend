import admin from './fireBaseAdmin';

export const notifyMechanics = async (tokens: string[]) => {
  const message = {
    notification: {
      title: 'New Booking',
      body: 'A new service has been booked!',
    },
    tokens,
  };

  try {
    const response = await admin.messaging().sendEachForMulticast(message);
    response.responses.forEach((resp, idx) => {
      if (resp.success) {
        console.log(`✅ Notification sent to token[${idx}]`);
      } else {
        console.error(`❌ Failed to send to token[${idx}]:`, resp.error);
      }
    });
  } catch (err) {
    console.error('🔥 Error sending push notification:', err);
  }
};
