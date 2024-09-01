const mongoose = require("mongoose");
const histirySchema = require("./ProductSchema");
const mobileschema = require("./ProductSchema");
const AlertLinkSchema = {
  userName: String,
  userEmail: String,
  productId: String,
  AlertAmount: Number,
};
const AlertList = mongoose.model("Alertlist", AlertLinkSchema);

module.exports = AlertList;
