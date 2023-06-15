const { mongoose } = require("../db");

const containerSchema = new mongoose.Schema({
  name: String,
  volume: Number,
});
containerSchema.set("toJSON", { virtuals: true });

// containerSchema.methods.toJSON = function () {
//   const product = this.toObject();
//   product.id = product._id.toString();
//   delete product._id;
//   return product;
// };

module.exports = mongoose.model("Container", containerSchema);
