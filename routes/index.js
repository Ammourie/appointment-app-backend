var express = require("express");
var router = express.Router();
const usersRouter = require("./users");
const authRouter = require("./auth");

app.use("/users", usersRouter);
app.use("/auth", authRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
});

module.exports = router;
