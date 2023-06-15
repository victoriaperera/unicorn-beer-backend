const { mongoose, Schema } = require("../db");
const slugify = require("slugify");

const productSchema = new mongoose.Schema({
  style: {
    type: Schema.Types.ObjectId,
    ref: "Style",
  },
  price: Number,
  container: { type: Schema.Types.ObjectId, ref: "Container" },
  photos: { type: [{ type: String }] }, // Preguntar si es correcto tener todas las fotos y mostrarlas en base al container
  stock: Number,
  featured: Boolean,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
});
productSchema.set("toJSON", { virtuals: true });

// productSchema.methods.toJSON = function () {
//   const product = this.toObject();
//   product.id = product._id.toString();
//   delete product._id;
//   return product;
// };

productSchema.virtual("slug").get(function () {
  return slugify(this.name, {
    replacement: "-", // replace spaces with replacement character, defaults to `-`
    remove: undefined, // remove characters that match regex, defaults to `undefined`
    lower: true, // convert to lower case, defaults to `false`
    strict: true, // strip special characters except replacement, defaults to `false`
    locale: "en", // language code of the locale to use
    trim: true, // trim leading and trailing replacement chars, defaults to `true`
  });
});

module.exports = mongoose.model("Product", productSchema);
