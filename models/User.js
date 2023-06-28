const { mongoose } = require("../db");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phone: String,
    address: String,
    shippingAddress: String,
  },
  { timestamps: true },
);

userSchema.methods.toJSON = function () {
  const user = this._doc;
  user.id = this._id.toString();
  // delete user._id;
  return user;
};

userSchema.pre("save", async function (next) {
  // Solo hashear la contraseña si ha sido modificada o es nueva
  // console.log("svew");
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hashear la contraseña
    const hashedPassword =  bcrypt.hash(this.password, 10);

    // Reemplazar la contraseña en texto plano por la contraseña hasheada
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
