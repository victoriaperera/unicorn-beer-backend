const { mongoose, Schema } = require("../db");
const slugify = require("slugify");
const Style = require("./Style");
const Container = require("./Container");

const productSchema = new mongoose.Schema({
  style: {
    type: Schema.Types.ObjectId,
    ref: "Style",
  },
  price: Number,
  container: { type: Schema.Types.ObjectId, ref: "Container" },
  photos: { type: [{ type: String }] },
  stock: Number,
  featured: Boolean,
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  name: String,
});
productSchema.set("toJSON", { virtuals: true });

productSchema.methods.setData = async function () {
  const style = await Style.findById(this.style);
  const container = await Container.findById(this.container);
  const product = this._doc;
  if (container.name === "keg") {
    product.name = `${style.name} ${container.name} ${
      container.volume * 1000 * process.env.CONVERT_ML_GAL
    }`;
  } else {
    product.name = `${style.name} ${container.name} ${
      container.volume * 1000 * process.env.CONVERT_ML_OZ
    }`;
  }
  product.price = `${(style.price * container.volume).toFixed(2)}`;

  return product;
};

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
