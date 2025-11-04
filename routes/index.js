var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
});
router.get("/hello", function (req, res, next) {
  res.send("hello world");
});
router.post("/dummyStores", function (req, res, next) {
  res.send({ success: true, message: "hello world" });
});

module.exports = router;
