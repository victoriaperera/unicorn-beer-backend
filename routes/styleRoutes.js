const express = require("express");
const router = express.Router();
const styleController = require("../controllers/styleController");

router.get("/", styleController.index);
router.post("/", styleController.store);
router.patch("/:id", styleController.update);
router.delete("/", styleController.destroy);

module.exports = router;
