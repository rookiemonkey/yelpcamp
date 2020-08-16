const express = require('express')
const router = express.Router({ mergeParams: true })
const multer = require('multer');
const toAuthenticate = require('../../middleware/toAuthenticate')
const isLoggedIn = require('../../middleware/isLoggedin')
const isStillApplicable = require("../../middleware/isStillApplicable");
const form_signup = require('./form_signup')
const form_login = require('./form_login')
const to_logout = require('./to_logout')
const form_forgotPassword = require('./form_forgotPassword')
const form_resetPassword = require('./form_resetPassword')
const get_userProfile = require('./get_userProfile')
const get_currentUserProfile = require('./get_currentUserProfile')
const handler_login = require('./handler_login')
const handler_signup = require('./handler_signup')
const handler_forgotPassword = require('./handler_forgotPassword')
const handler_resetPassword = require('./handler_resetPassword')

const setMulter = require("../../middleware/setMulter");
const upload = setMulter(multer);

// ROOT: /campgrounds/users

router
    .get('/signup', isStillApplicable, form_signup)
    .get('/login', isStillApplicable, form_login)
    .get('/forgot_password', isStillApplicable, form_forgotPassword)
    .get('/forgot_password/:token', form_resetPassword)
    .get('/logout', isLoggedIn, to_logout)
    .get('/me', isLoggedIn, get_currentUserProfile)
    .get('/:id', get_userProfile)
    .post('/signup', isStillApplicable, upload.single('avatar'), handler_signup)
    .post('/login', toAuthenticate, handler_login)
    .post('/forgot_password', handler_forgotPassword)
    .post('/forgot_password/:token', handler_resetPassword)

module.exports = router