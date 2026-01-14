const express = require("express");
const router = express.Router({mergeParams : true }); //By default false to get id from /:id/review
const asyncWrap = require("../utils/asyncWrap.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js");

const Listing = require("../models/listing.js");
const {validateReview, isLoggedIn, isOwner,isReviewAuthor } =require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
const review = require("../models/review.js");




// Review Post Route
router.post("/",isLoggedIn,validateReview,asyncWrap(reviewController.createReview));

//Delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,asyncWrap(reviewController.destroyReview));

module.exports = router;