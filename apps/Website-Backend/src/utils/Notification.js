import { LocalStorage } from 'node-localstorage';

// // Create a localStorage instance
// const localStorage = new LocalStorage('./scratch');

// // Example usage
// localStorage.setItem('notification-token', localStorage); // Setting an item
console.log(localStorage.getItem('notification-token')); // Getting an item

// console.log(localStorage.getItem('notification-token'))

// These registration tokens come from the client FCM SDKs.
// const registrationTokens = [
//     'YOUR_REGISTRATION_TOKEN_1',
//     // ...
//     'YOUR_REGISTRATION_TOKEN_n'
//   ];
  
//   // Subscribe the devices corresponding to the registration tokens to the
//   // topic.
//   getMessaging().subscribeToTopic(registrationTokens, topic)
//     .then((response) => {
//       // See the MessagingTopicManagementResponse reference documentation
//       // for the contents of response.
//       console.log('Successfully subscribed to topic:', response);
//     })
//     .catch((error) => {
//       console.log('Error subscribing to topic:', error);
//     });