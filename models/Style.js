const { mongoose } = require("../db");

const StyleSchema = new mongoose.Schema({
  name: String,
  description: String,
});
// StyleSchema.set("toJSON", { virtuals: true });

// StyleSchema.methods.toJSON = function () {
//   const product = this.toObject();
//   product.id = product._id.toString();
//   return product;
// };

module.exports = mongoose.model("Style", StyleSchema);
