const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const products = [
    {
      style: "",
      price: 4.99,
      container: String,
      photos: [],
      stock: 200,
      featured: false,
      name: `${container} of ${style}`,
    },
  ];

  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
