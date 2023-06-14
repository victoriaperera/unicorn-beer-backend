const { mongoose } = require("../db");
const bcrypt = require("bcryptjs");

const AdminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});
// AdminSchema.set("toJSON", { virtuals: true });

// AdminSchema.methods.toJSON = function () {
//   const product = this.toObject();
//   product.id = product._id.toString();
//   delete product._id;
//   return product;
// };

AdminSchema.pre("save", async function (next) {
  // Solo hashear la contraseña si ha sido modificada o es nueva
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(this.password, 10);

    // Reemplazar la contraseña en texto plano por la contraseña hasheada
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("Admin", AdminSchema);
