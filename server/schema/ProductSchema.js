const mongoose = require("mongoose");

const histirySchema = new mongoose.Schema({
  price: String,
  date: { type: Date, default: Date.now },
});
const Productschema = new mongoose.Schema({
  title: String,
  price: String,
  image: String,
  WebSite: String,

  priceHistory: [histirySchema],
  currentDate: { type: Date, default: Date.now },
  productLink: String,
});
const Products = mongoose.model("Products", Productschema);

module.exports = Products;
