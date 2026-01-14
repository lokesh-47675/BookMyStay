const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type :String,
        required:true
    }
    //username and password define by default so no need to define separately

})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);