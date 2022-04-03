const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let productsSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    price: { type: Number, required: true },
    brand: { type: String },
    rating: { type: Number },
    numReviews: { type: Number },
    countInStock: { type: Number },
    userEmail: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

const Products = mongoose.model("products", productsSchema);

module.exports = Products;