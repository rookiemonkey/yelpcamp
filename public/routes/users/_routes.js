const express = require('express')
const router = express.Router({ mergeParams: true })
const toAuthenticate = require('../../middleware/toAuthenticate')
const form_signup = require('./form_signup')
const form_login = require('./form_login')
const to_logout = require('./to_logout')
const form_forgotPassword = require('./form_forgotPassword')
const form_resetPassword = require('./form_resetPassword')
const handler_login = require('./handler_login')
const handler_signup = require('./handler_signup')
const handler_forgotPassword = require('./handler_forgotPassword')
const handler_resetPassword = require('./handler_resetPassword')

// ROOT: /campgrounds/users

router
    .get('/signup', form_signup)
    .get('/login', form_login)
    .get('/forgot_password', form_forgotPassword)
    .get('/forgot_password/:token', form_resetPassword)
    .get('/logout', to_logout)
    .post('/signup', handler_signup)
    .post('/login', toAuthenticate, handler_login)
    .post('/forgot_password', handler_forgotPassword)
    .post('/forgot_password/:token', handler_resetPassword)

module.exports = router