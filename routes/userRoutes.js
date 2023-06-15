const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
var { expressjwt: checkJwt } = require("express-jwt");

router.get("/", userController.index);
router.post("/", userController.store);
router.patch("/:id", userController.update);
router.delete("/", userController.destroy);

module.exports = router;
