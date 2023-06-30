const Order = require("../models/Order");
const Product = require("../models/Product");
const { sendEmail } = require("../middlewares/sendMailOrders");

async function index(req, res) {
  const orders = await Order.find().sort({ createdAt: -1 });

  return res.json(orders);
}

async function show(req, res) {
  const order = await Order.findById(req.body.orderId);
  return res.json(order);
}

async function store(req, res) {
  const updated = false;
  try {
    const order = await Order.create({
      user: req.body.user,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      totalQuantity: req.body.totalQuantity,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      deliveryDate: req.body.deliveryDate,
      shippingDate: req.body.shippingDate,
    });
    for (const product of req.body.products) {
      await Product.findByIdAndUpdate(product.id, {
        stock: product.stock - product.quantity,
      });
    }
    sendEmail(order, updated);
    return res.status(201).json(order);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
}

async function update(req, res) {
  const updated = true;

  console.log("ordenes");
  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
    {
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      totalQuantity: req.body.totalQuantity,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
      deliveryDate: req.body.deliveryDate,
      shippingDate: req.body.shippingDate,
    },
    { new: true },
  );
  sendEmail(order, updated);
  return res.status(209).json(order);
}

async function destroy(req, res) {
  const order = await Order.findByIdAndDelete(req.body.orderId);
  return res.status(200).send({ message: "Order deleted" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
