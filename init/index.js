const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mongoose = require("mongoose");

const express = require("express");
const methodOverride = require("method-override");

const app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));


main().then(() => {
    console.log("Connected Established!");
}).catch((err)=>{
    console.log(err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB =  async() => {
    await Listing.deleteMany({}); //delete all initial data
    initData.data=initData.data.map((obj) =>({...obj,owner : "68d58e66beea967a26949db7"}));
    await Listing.insertMany(initData.data); //insert new data
    console.log("data was initialized");
}

initDB();