const Admin = require("../models/Admin");
const User = require("../models/User");

async function index(req, res) {
  const admin = await Admin.findOne({ email: req.body.email }).select("-password");

  return res.json(admin);
}

async function show(req, res) {}

async function update(req, res) {
  form.parse(req, async (err, fields, files) => {
    const userUpdate = {};

    const user = await User.findByIdAndUpdate(req.auth.userId, userUpdate, { new: true }).select(
      "-password",
    );
  });
  return res.json(user);
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
