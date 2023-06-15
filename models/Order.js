const { mongoose, Schema } = require("../db");

const orderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    totalAmount: Number,
    paymentMethod: String,
    status: String,
    shippingDate: Date,
    deliveryDate: Date,
  },
  { timestamps: true },
);

orderSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Order", orderSchema);
