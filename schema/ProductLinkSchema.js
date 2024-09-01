const mongoose = require("mongoose");

const productLinkSchema = {
  productLink: String,
};
const productLink = mongoose.model("productLink", productLinkSchema);

module.exports = productLink;
