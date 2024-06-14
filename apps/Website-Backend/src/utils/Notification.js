import { getMessaging } from "firebase/messaging";
import User from "../Schema/UserSchema.js";

// These registration tokens come from the client FCM SDKs.
const getAllNotificationTokens = async () => {
    try {
        const users = await User.find({}, 'notificationToken'); // Only select the notificationToken field
        const notificationTokens = users.map(user => user.notificationToken);
        return notificationTokens;
    } catch (error) {
        console.error('Error fetching notification tokens:', error);
        throw error;
    }
};

// Function to send messages
const sendMessage = async () => {
    try {
        const registrationTokens = await getAllNotificationTokens();
        console.log('tokens', registrationTokens);

        const message = {
            data: {
                score: '850',
                time: '2:45'
            },
            tokens: registrationTokens // Use 'tokens' for an array of tokens
        };

        // Send a message to devices subscribed to the provided topic or registration tokens
        getMessaging().sendMulticast(message)
            .then((response) => {
                console.log('Successfully sent message', response);
            })
            .catch((error) => {
                console.error('Error in sending the message', error);
            });
    } catch (error) {
        console.error('Error in sending the message:', error);
    }
};

// Call the sendMessage function
sendMessage();
