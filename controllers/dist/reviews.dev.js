"use strict";

var Review = require("../models/review");

var Listing = require("../models/listing");

var _require = require("mongoose"),
    mongoose = _require["default"];

module.exports.createReview = function _callee(req, res) {
  var listing, newReview;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Listing.findById(req.params.id));

        case 2:
          listing = _context.sent;
          newReview = new Review(req.body.review);
          newReview.author = req.user._id;
          listing.reviews.push(newReview);
          _context.next = 8;
          return regeneratorRuntime.awrap(newReview.save());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(listing.save());

        case 10:
          console.log("new review saved");
          req.flash("success", "New Review Created!");
          res.redirect("/listings/".concat(listing.id));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.destroyReview = function _callee2(req, res) {
  var _req$params, id, reviewId;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, reviewId = _req$params.reviewId;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Listing.findByIdAndUpdate(id, {
            $pull: {
              reviews: new mongoose.Types.ObjectId(reviewId)
            }
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Review.findByIdAndDelete(reviewId));

        case 5:
          req.flash("Success", "Review Deleted!");
          res.redirect("/listings/".concat(id));

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
};