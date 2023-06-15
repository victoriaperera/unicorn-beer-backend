const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const formidable = require("formidable");

async function login(req, res) {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    checkPass = await bcrypt.compare(req.body.password, user.password);

    if (checkPass) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_CUSTOMER_SECRET_KEY, {
        expiresIn: "10h",
      });
      delete user._doc.password;
      user._doc.token = token;

      return res.status(201).json(user);
    }
  } else {
    return res.status(401).send({ message: "Incorrect Credentials" });
  }
}

async function signUp(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    console.log(fields.email);
    const user = await User.findOne({
      email: fields.email,
    });

    if (user) {
      return res
        .status(409)
        .send({ message: "User already registered, try with an other email or username" });
    } else {
      const stringifyPass = fields.password;
      const newUser = await User.create({
        firstname: fields.firstname,
        lastname: fields.lastname,
        email: fields.email,
        phone: fields.phone,
        address: fields.address,
        shippingAddress: fields.shippingAddress,
        password: stringifyPass.toString(),
      });

      
      if (newUser) {
        const user = await User.findOne({
          email: newUser.email,
        });
        const token = jwt.sign({ userId: user.id }, process.env.JWT_CUSTOMER_SECRET_KEY, {
          expiresIn: "10h",
        });
        delete user._doc.password;
        user._doc.token = token;

        return res.status(201).json(user);
      } else {
        return res.status(502).send({ message: "User cannot be created, try later" });
      }
    }
  });
}

async function logOut(req, res) {
  res.clearCookie("token");
  console.log("logged out successfully");
  res.json({ message: "Logged out successfully" });
}

//TODO: hacer edit password

module.exports = { login, signUp, logOut };
