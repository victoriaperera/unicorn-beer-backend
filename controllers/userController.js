const User = require("../models/User");
const Order = require("../models/Order");

async function index(req, res) {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function show(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email }).select("-password");
    const orders = await Order.find({ user: req.auth.userId });
    user.orders = orders;
    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function store(req, res) {
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    shippingAddress: req.body.shippingAddress,
  });

  newUser
    ? res.status(201).json(newUser)
    : res.status(409).send({ message: "Something went wrong, try again later" });
}

async function update(req, res) {
  const user = await User.findByIdAndUpdate(
    req.auth.id,
    {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password,
      phone: req.body.phone,
      address: req.body.address,
      shippingAddress: req.body.shippingAddress,
    },
    { new: true },
  ).select("-password");
  const orders = await Order.find({ user: req.auth.id })
    .sort({ createdAt: -1 })
    .populate("user", "-password");
  user._doc.orders = orders;

  return res.status(202).json(user);
}

async function destroy(req, res) {
  await User.findByIdAndDelete(req.body.userId);
  res.status(200).json("Se ha borrado el usuario correctamente");
}

async function getOrders(req, res) {
  const orders = await Order.find({ user: req.auth.id }).sort({ createdAt: -1 });
  return res.status(200).json(orders);
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  getOrders,
};
