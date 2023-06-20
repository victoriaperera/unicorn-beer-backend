const { mongoose } = require("../db");

const StyleSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  photos: [],
  abv: Number,
});
StyleSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Style", StyleSchema);
