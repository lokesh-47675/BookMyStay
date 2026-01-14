"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new Schema({
  email: {
    type: String,
    required: true
  } //username and password define by default so no need to define separately

});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);