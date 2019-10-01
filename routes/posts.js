require("dotenv").config();
const bcrypt = require("bcrypt");
const Admin = require("../models/admin");

module.exports = router => {
  router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    if (!name || !email || !password) {
      console.log("please fill all fields");
    }
    if (password !== password2) {
      console.log("passwords do not match");
    }
    const newAdmin = new Admin({
      name,
      email,
      password
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, salt) => {
        if (err) {
          throw err;
        }
        newAdmin.password = salt;
        newAdmin.save().then(admin => {
          res.status(200).redirect("/");
        });
      });
    });
  });

  router.post("/send", (req, res) => {
    const credentials = {
      apiKey: process.env.AT_KEY,
      username: "nyatindopatrick"
    };

    // Initialize the SDK
    const AfricasTalking = require("africastalking")(credentials);

    // Get the SMS service
    const sms = AfricasTalking.SMS;
    const myMessage = req.body.myMessage;
    const phone = `+254${req.body.phone}`;
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

    sendMessage();
    res.status(200).redirect("/home");
  });
};
