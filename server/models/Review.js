const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  productId: mongoose.Schema.Types.ObjectId,
  username: String,
  comment: String,
  rating: Number
});

module.exports = mongoose.model("Review", reviewSchema);