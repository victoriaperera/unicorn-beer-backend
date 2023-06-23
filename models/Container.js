const { mongoose } = require("../db");

const containerSchema = new mongoose.Schema({
  name: String,
  volume: Number,
});
containerSchema.set("toJSON", { virtuals: true });

// containerSchema.methods.toJSON = function () {
//   const container = this._doc;
//   container.id = container._id.toString();

//   return container;
// };

module.exports = mongoose.model("Container", containerSchema);
