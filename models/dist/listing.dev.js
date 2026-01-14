"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var Review = require("./review.js");

var listingSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    url: String,
    // set : (v) => v===" "? "https://lh3.googleusercontent.com/gg-dl/AJfQ9KTbKzZ4_WsO_Dipov2rK-Mq1KJjaqlBbdVG3wLsr-3oUyql82YR04kcyeeh39UqJwbiTrHQR13prvr2sjbtX9_uC2bIv91THjgHrAv5xYB_CcIXzhZmYywgUN8Wybcw3sbWn7_1y743jYVl_fQWC5mYStFgqz7t6YrdbQgz-ybD_11_=s1024":v,
    filename: String
  },
  price: Number,
  location: String,
  country: String,
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}); //Handling deletion (when whole listing is deleted their corresponding reviews also get delete from the reviews database)

listingSchema.post("findOneAndDelete", function _callee(listing) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!listing) {
            _context.next = 3;
            break;
          }

          _context.next = 3;
          return regeneratorRuntime.awrap(Review.deleteMany({
            _id: {
              $in: listing.reviews
            }
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
var Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;