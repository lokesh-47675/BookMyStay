"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    "default": Date.now()
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});
module.exports = mongoose.model("Review", reviewSchema);