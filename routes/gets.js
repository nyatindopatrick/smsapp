const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const showTime = () => {
  const date = new Date();
  const hour = date.getHours();
  let time;
  if (hour > 1 && hour < 12) {
    time = "Good morning";
  }
  if (hour >= 12 && hour < 16) {
    time = "Good afternoon";
  }
  if (hour >= 16 && hour < 19) {
    time = "Good evening";
  }
  if (hour >= 20 && hour < 24) {
    time = "Good night";
  }
  return time;
};
module.exports = router => {
  router.get("/", forwardAuthenticated, (req, res) => {
    res.render("login");
  });

  router.get("/home", ensureAuthenticated, (req, res) => {
    res.render("home", {
      user: req.user,
      greeting: showTime()
    });
  });
};
