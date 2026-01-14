"use strict";

var Listing = require("../models/listing");

module.exports.index = function _callee(req, res) {
  var allListing;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Listing.find({}));

        case 2:
          allListing = _context.sent;
          res.render("listings/index.ejs", {
            allListing: allListing
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports.renderNewForm = function _callee2(req, res) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          res.render("listings/new.ejs");

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

module.exports.showListing = function _callee3(req, res) {
  var id, listing;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Listing.findById(id).populate({
            path: "reviews",
            populate: {
              path: "author"
            }
          }).populate("owner"));

        case 3:
          listing = _context3.sent;

          if (!listing) {
            req.flash("error", "Listing you requested for does not exist!");
            res.redirect("/listings");
          }

          console.log(listing);
          res.render("listings/show.ejs", {
            listing: listing
          });

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
};

module.exports.createListing = function _callee4(req, res) {
  var url, filename, listing, newListing;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          url = req.file.path;
          filename = req.file.filename;
          console.log(url, "..", filename);
          listing = req.body.listing;
          newListing = new Listing(listing);
          newListing.owner = req.user._id;
          newListing.image = {
            url: url,
            filename: filename
          };
          _context4.next = 9;
          return regeneratorRuntime.awrap(newListing.save());

        case 9:
          req.flash("success", "New Listing Created!");
          res.redirect("/listings");

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports.renderEditForm = function _callee5(req, res) {
  var id, editData, originalImageUrl;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.next = 3;
          return regeneratorRuntime.awrap(Listing.findById(id));

        case 3:
          editData = _context5.sent;

          if (!editData) {
            req.flash("error", "Listing you requested for does not exist!");
            res.redirect("/listings");
          }

          originalImageUrl = editData.image.url;
          res.render("listings/edit.ejs", {
            editData: editData,
            originalImageUrl: originalImageUrl
          });

        case 7:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports.updateListing = function _callee6(req, res) {
  var id, listing, url, filename;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.next = 3;
          return regeneratorRuntime.awrap(Listing.findByIdAndUpdate(id, req.body.listing, {
            "new": true
          }));

        case 3:
          listing = _context6.sent;

          if (!(typeof req.file !== "undefined")) {
            _context6.next = 10;
            break;
          }

          url = req.file.path;
          filename = req.file.filename;
          listing.image = {
            url: url,
            filename: filename
          };
          _context6.next = 10;
          return regeneratorRuntime.awrap(listing.save());

        case 10:
          req.flash("success", "Listing Updated!");
          res.redirect("/listings/".concat(id));

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  });
};

module.exports.destroyListing = function _callee7(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.next = 3;
          return regeneratorRuntime.awrap(Listing.findByIdAndDelete(id));

        case 3:
          req.flash("success", "Listing Deleted");
          res.redirect("/listings");

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
};