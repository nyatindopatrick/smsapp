const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
const expressLayouts = require("express-ejs-layouts");
require("./routes/autosend");

require("dotenv").config();
const port = process.env.PORT || 3000;
require("./config/passport")(passport);
const app = express();

app.use(express.static("public"));

//body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

//db connection
mongoose
  .connect(process.env.API_KEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("database connected"))
  .catch(err => console.log(err));

//ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

app.use(logger("dev"));

app.use("/", require("./routes"));

app.listen(
  port,
  setInterval(autosend, 40000),
  console.log(`server running on port ${port}`)
);
