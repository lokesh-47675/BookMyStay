const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    description :{
        type: String,
    },
    image:{
        url: String,
        // set : (v) => v===" "? "https://lh3.googleusercontent.com/gg-dl/AJfQ9KTbKzZ4_WsO_Dipov2rK-Mq1KJjaqlBbdVG3wLsr-3oUyql82YR04kcyeeh39UqJwbiTrHQR13prvr2sjbtX9_uC2bIv91THjgHrAv5xYB_CcIXzhZmYywgUN8Wybcw3sbWn7_1y743jYVl_fQWC5mYStFgqz7t6YrdbQgz-ybD_11_=s1024":v,
        filename: String,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [{
        type: Schema.Types.ObjectId,
        ref :"Review",
    }],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
});


//Handling deletion (when whole listing is deleted their corresponding reviews also get delete from the reviews database)
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;