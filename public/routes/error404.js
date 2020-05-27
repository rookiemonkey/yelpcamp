// ===========================
// ROUTE DEPENDENCIES
// ===========================
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const sanitizer = require("express-sanitizer");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const Comment = require("../schemas/commentSchema");
const Campground = require("../schemas/campgroundSchema");
const User = require("../schemas/userSchema");

// ===========================
// 404 ERROR
// ===========================
router.get("*", (req, res) => {
    res.send("ERROR:404 Unfortunately, the page that you are asking is not existing..")
});

// ===========================
// EXPORTS ALL THE ROUTES
// ===========================
module.exports = router;