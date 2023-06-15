const User = require("../models/User");

async function index(req, res) {
  const user = await User.findOne({ email: req.body.email }).select("-password");

  return res.status(200).json(user);
}

async function store(req, res) {
  const newUser = await User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    shippingAddress: req.body.shippingAddress,
  });
  
  newUser
  ? res.status(201).json(style)
  : res.status(409).send({ message: "Something went wrong, try again later" });
});
}

async function update(req, res) {
  const user = await User.findByIdAndUpdate(
    req.auth.userId,
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

  return res.status(202).json(user);
}

async function destroy(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("Se ha borrado el usuario correctamente");
}

module.exports = {
  index,
  show,
  update,
  destroy,
};
