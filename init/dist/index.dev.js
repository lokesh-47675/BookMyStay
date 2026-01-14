"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initData = require("./data.js");

var Listing = require("../models/listing.js");

var mongoose = require("mongoose");

var express = require("express");

var methodOverride = require("method-override");

var app = express();
app.use(methodOverride("_method"));
app.use(express.urlencoded({
  extended: true
}));
main().then(function () {
  console.log("Connected Established!");
})["catch"](function (err) {
  console.log(err);
});

function main() {
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(mongoose.connect("mongodb://127.0.0.1:27017/wanderlust"));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

var initDB = function initDB() {
  return regeneratorRuntime.async(function initDB$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Listing.deleteMany({}));

        case 2:
          //delete all initial data
          initData.data = initData.data.map(function (obj) {
            return _objectSpread({}, obj, {
              owner: "68d58e66beea967a26949db7"
            });
          });
          _context2.next = 5;
          return regeneratorRuntime.awrap(Listing.insertMany(initData.data));

        case 5:
          //insert new data
          console.log("data was initialized");

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
};

initDB();