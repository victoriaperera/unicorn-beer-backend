const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");

module.exports = (app) => {
  app.use("/products", productRoutes);
  app.use("/auth", authRoutes);
  app.use("/orders", orderRoutes);
  app.use("/admin", adminRoutes);
};
