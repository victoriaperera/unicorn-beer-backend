const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.patch("/", productController.update);
router.delete("/", productController.destroy);

module.exports = router;
