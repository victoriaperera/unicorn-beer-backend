const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);
router.delete("/", orderController.destroy);

module.exports = router;
