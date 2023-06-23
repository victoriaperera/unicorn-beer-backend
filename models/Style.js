const { mongoose, Schema } = require("../db");

const styleSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  photos: [],
  abv: Number,
  containers: [],
});
styleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Style", styleSchema);
