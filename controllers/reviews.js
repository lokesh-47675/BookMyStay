const Review = require("../models/review");
const Listing = require("../models/listing");
const { default: mongoose } = require("mongoose");


module.exports.createReview  = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);


    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing.id}`);
};


module.exports.destroyReview = async (req,res)=>{
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews :  new mongoose.Types.ObjectId(reviewId)}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success","Review Deleted!");
    res.redirect(`/listings/${id}`);
};