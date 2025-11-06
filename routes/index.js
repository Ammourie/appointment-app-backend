var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const routeFiles = fs
  .readdirSync(__dirname)
  .filter((file) => file !== "index.js" && file.endsWith(".js"));

// Auto-import and mount all routes
routeFiles.forEach((file) => {
  const routeName = file.replace(".js", ""); // "appointments.js" → "appointments"
  const routeModule = require(`./${file}`);
  router.use(`/${routeName}`, routeModule);
  console.log(`✅ Loaded route: /api/${routeName}`);
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
});

module.exports = router;
