const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
var { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] }))

router.get("/", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.patch("/:id", productController.update);
router.delete("/", productController.destroy);

module.exports = router;