const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const asyncWrap = require("../utils/asyncWrap.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const  listingController = require("../controllers/listings.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});





router.route("/")
.get(asyncWrap(listingController.index)) // Index Route
.post(isLoggedIn,upload.single('listing[image]'),validateListing,asyncWrap(listingController.createListing)); //Create Route



//New Route
router.get("/new",isLoggedIn,asyncWrap(listingController.renderNewForm));

router.route("/:id")
.get(asyncWrap(listingController.showListing)) //Show Route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,asyncWrap(listingController.updateListing))//Update Route
.delete(isLoggedIn,isOwner,asyncWrap(listingController.destroyListing)); //Delete Route

// //Search 
// router.get("/",asyncWrap(listingController.index));


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,asyncWrap(listingController.renderEditForm));



module.exports = router;



















