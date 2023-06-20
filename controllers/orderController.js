const Order = require("../models/Order");
const Product = require("../models/Product");

async function index(req, res) {
  const orders = await Order.find();

  return res.json(orders);
}

async function show(req, res) {
  const order = await Order.findById(req.body.orderId);
  return res.json(order);
}

async function store(req, res) {
  try {
    
    const order = await Order.create({
      user: req.auth.id,
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
    });
    for(const product of req.body.products) {
      const productToU = await Product.findById(product)
      productToU.stock = product.stock - product.quantity
      await productToU.save();
    }
    return res.status(201).json(order);
  } catch(err) {
    console.log(err)
    return res.status(400).json(err)
  }

}

async function update(req, res) {
  const order = await Order.findByIdAndUpdate(
    req.body.orderId,
    {
      products: req.body.products,
      totalAmount: req.body.totalAmount,
      status: req.body.status,
      paymentMethod: req.body.paymentMethod,
    },
    { new: true },
  );
  return res.status(209).json(order);
}
async function destroy(req, res) {
  const order = await Order.findByIdAndDelete(req.body.orderId);
  return res.status(200).send({message: "Order deleted"})
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};