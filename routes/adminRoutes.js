const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
var { expressjwt: checkJwt } = require("express-jwt");

router.get("/", adminController.index);
router.post("/token", adminController.login);
router.delete(
  "/:id",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  adminController.destroy,
);

module.exports = router;
