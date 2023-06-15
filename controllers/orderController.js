const Order = require("../models/Order");

async function index(req, res) {
  const orders = await Order.find();

  return res.json(orders);
}

async function show(req, res) {}

async function store(req, res) {}

async function update(req, res) {}
async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
