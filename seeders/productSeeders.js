const Product = require("../models/Product");
const Container = require("../models/Container");
const Style = require("../models/Style");

module.exports = async () => {
  const products = [
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
    {
      photos: [],
      stock: 200,
      featured: false,
    },
  ];

  const styles = await Style.find();
  const containers = await Container.find();

  for (let i = 0; i < products.length; i++) {
    const styleIndex = i % styles.length;
    const containerIndex = i % containers.length;

    products[i].style = styles[styleIndex]._id;
    products[i].container = containers[containerIndex]._id;
    products[i].name = `${styles[styleIndex].name} ${containers[containerIndex].name} ${(
      containers[containerIndex].volume *
      1000 *
      process.env.CONVERT_ML_OZ
    ).toFixed(2)} Oz`;
    products[i].price = `${(styles[styleIndex].price * containers[containerIndex].volume).toFixed(
      2,
    )}`;
    products[i].photos.push("5dbdf0224df0930f778771500.png");
    products[i].photos.push("5dbdf0224df0930f778771501.png");
  }

  await Product.insertMany(products);
  console.log("[Database] Se corrió el seeder de Productos.");
};
