// =========================================
// DEPENDENCIES
// =========================================
require('dotenv').config()
const express = require("express");
const app = express();
const sanitizer = require("express-sanitizer");
const methodOverride = require("method-override");
const parser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const session = require("express-session");
const flash = require("express-flash");
const mongoose = require("mongoose");
const Comment = require("./public/schemas/commentSchema");
const Campground = require("./public/schemas/campgroundSchema");
const User = require("./public/schemas/userSchema");
const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(parser.urlencoded({extended: true}));
app.use(sanitizer());
app.locals.moment = require('moment');

// passport configuration
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash configuration
app.use(flash());
app.use( function (req, res, next) {
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    next();
})

// =========================================
// CONNECT/CHECK DATABASE
// =========================================
mongoose.connect(process.env.DBURL, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on("error", () => {
    console.error("Something went wrong upon connecting to the database. TIMESTAMP:", Date());
});
mongoose.connection.on("open", () => {
    if (process.env.DBURL == "mongodb://localhost/yelpcamp"){
        console.log("Established connection to Mongo Local database. TIMESTAMP:", Date())
    } else {
        console.log("Established connection to Mongo Atlas remote database. TIMESTAMP:", Date())
    }
});

// =========================================
// ROUTES
// =========================================
app.use(require("./public/routes/index"));          // /campgrounds
app.use(require("./public/routes/signup"));         // /campgrounds/signup
app.use(require("./public/routes/login"));          // /campgrounds/login
app.use(require("./public/routes/logout"));         // /campgrounds/logout
app.use(require("./public/routes/new"));            // /campgrounds/new
app.use(require("./public/routes/forgotPassword")); // /campgrounds/forgot-password
app.use(require("./public/routes/resetPassword")); // /campgrounds/forgot-password/reset/:token
app.use(require("./public/routes/show"));           // /campgrounds/:id
app.use(require("./public/routes/editCamp"));       // /campgrounds/:id/edit
app.use(require("./public/routes/updateCamp"));     // /campgrounds/:id/update
app.use(require("./public/routes/deleteCamp"));     // /campgrounds/:id/delete
app.use(require("./public/routes/comment"));        // /campgrounds/:id/comment
app.use(require("./public/routes/updateComment"));  // /campgrounds/:id/comment/:comid/update
app.use(require("./public/routes/deleteComment"));  // /campgrounds/:id/comment/:comid/delete
app.use(require("./public/routes/error404"));       // /*

// =========================================
// SERVER
// =========================================
app.listen(PORT, () => {
    if (PORT == 8000){
        console.log(`Yelpcamp server started at http://localhost:${PORT} TIMESTAMP: `, Date());
    } else {
        console.log(`Yelpcamp server started at HEROKU PORT:${process.env.PORT} TIMESTAMP: `, Date());
    }
});