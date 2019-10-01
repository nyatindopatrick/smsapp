const router = require("express").Router();
require("dotenv").config();
const bcrypt = require("bcrypt");

require("./posts")(router);
require("./gets")(router);

module.exports = router;
