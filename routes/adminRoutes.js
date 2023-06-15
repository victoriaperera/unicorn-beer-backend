const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
var { expressjwt: checkJwt } = require("express-jwt");

router.post("/token", adminController.login);

router.get(
  "/",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  adminController.index,
);

module.exports = router;
