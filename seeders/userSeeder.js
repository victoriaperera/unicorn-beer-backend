const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const bcrypt = require("bcryptjs");

faker.locale = "en";

module.exports = async () => {
  const users = [];
  const productsArr = [];
  paymentMethods = ["Visa", "Mastercard", "Paypal"];

  for (let i = 0; i < 10; i++) {
    users.push(
      new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.address.streetAddress(),
        shippingAddress: faker.address.streetAddress(),
      }),
    );
  }
  for (const user of users) {
    const products = await Product.find().populate("container").populate("style");
    let totalAmount = 0;

    if (Math.random() > 0.5 ? 1 : 0) {
      for (const product of products) {
        if (Math.random() > 0.5 ? 1 : 0) {
          const productQuantity = Math.floor(Math.random() * 5);
          if (productQuantity > 0) {
            totalAmount += Number((product.style.price * product.container.volume).toFixed(2));
            const productObj = { product: product._id, productQuantity: productQuantity };
            productsArr.push(productObj);
          }
        }
      }
      const order = new Order({
        user: user._id,
        products: productsArr,
        totalAmount: totalAmount,
        status: "paid",
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
      });
      await order.save();
    }
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
