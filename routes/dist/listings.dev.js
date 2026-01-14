"use strict";

var express = require("express");

var router = express.Router();

var Listing = require("../models/listing.js");

var asyncWrap = require("../utils/asyncWrap.js");

var _require = require("../middleware.js"),
    isLoggedIn = _require.isLoggedIn,
    isOwner = _require.isOwner,
    validateListing = _require.validateListing;

var listingController = require("../controllers/listings.js");

var multer = require("multer");

var _require2 = require("../cloudConfig.js"),
    storage = _require2.storage;

var upload = multer({
  storage: storage
});
router.route("/").get(asyncWrap(listingController.index)) // Index Route
.post(isLoggedIn, upload.single('listing[image]'), validateListing, asyncWrap(listingController.createListing)); //Create Route
//New Route

router.get("/new", isLoggedIn, asyncWrap(listingController.renderNewForm));
router.route("/:id").get(asyncWrap(listingController.showListing)) //Show Route
.put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, asyncWrap(listingController.updateListing)) //Update Route
["delete"](isLoggedIn, isOwner, asyncWrap(listingController.destroyListing)); //Delete Route
//Edit Route

router.get("/:id/edit", isLoggedIn, isOwner, asyncWrap(listingController.renderEditForm));
module.exports = router;