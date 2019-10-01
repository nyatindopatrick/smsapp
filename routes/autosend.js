require("dotenv").config();

const credentials = {
  apiKey: process.env.AT_KEY,
  username: "nyatindopatrick"
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;
const myMessage = "It is time";
const phone = `+254718714785`;
function sendMessage() {
  const options = {
    // Set the numbers you want to send to in international format
    to: [phone],
    // Set your message
    message: myMessage
    // Set your shortCode or senderId
    //from:
  };

  sms
    .send(options)
    .then(console.log)
    .catch(console.log);
}

module.exports = autosend = () => {
  const date = new Date();
  const hour = date.getHours();
  const mins = date.getMinutes();
  if (hour === 19 && mins === 45) {
    console.log("It is time");
  }
};

