const Admin = require("../models/Admin");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function index(req, res) {
  const admin = await Admin.find().select("-password");

  return res.json(admin);
}

async function login(req, res) {
  const admin = await Admin.findOne({ email: req.body.email });
  if (admin) {
    checkPass = await bcrypt.compare(req.body.password, admin.password);

    if (checkPass) {
      const token = jwt.sign({ id: admin.id }, process.env.JWT_ADMIN_SECRET_KEY, {
        expiresIn: "1h",
      });
      delete admin._doc.password;
      admin._doc.token = token;

      return res.status(201).json(admin);
    }
  } else {
    return res.status(401).send({ message: "Incorrect Credentials" });
  }
}

async function destroy(req, res) {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).json("Se ha borrado el usuario correctamente");
}

module.exports = {
  index,
  login,
  destroy,
};
