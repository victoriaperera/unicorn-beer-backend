const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }))

router.get("/", userController.index);
router.get("/:id", userController.show);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/", userController.destroy);

module.exports = router;