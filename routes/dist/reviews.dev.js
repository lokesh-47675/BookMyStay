"use strict";

var express = require("express");

var router = express.Router({
  mergeParams: true
}); //By default false to get id from /:id/review

var asyncWrap = require("../utils/asyncWrap.js");

var ExpressError = require("../utils/ExpressError.js");

var Review = require("../models/review.js");

var Listing = require("../models/listing.js");

var _require = require("../middleware.js"),
    validateReview = _require.validateReview,
    isLoggedIn = _require.isLoggedIn,
    isOwner = _require.isOwner,
    isReviewAuthor = _require.isReviewAuthor;

var reviewController = require("../controllers/reviews.js");

var review = require("../models/review.js"); // Review Post Route


router.post("/", isLoggedIn, validateReview, asyncWrap(reviewController.createReview)); //Delete review route

router["delete"]("/:reviewId", isLoggedIn, isReviewAuthor, asyncWrap(reviewController.destroyReview));
module.exports = router;