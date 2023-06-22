const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var { expressjwt: checkJwt } = require("express-jwt");

router.get("/", userController.index);
router.get("/", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete(
  "/",
  checkJwt({ secret: process.env.JWT_ADMIN_SECRET_KEY, algorithms: ["HS256"] }),
  userController.destroy,
);

module.exports = router;
