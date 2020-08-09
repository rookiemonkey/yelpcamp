const express = require('express')
const multer = require('multer');
const router = express.Router({ mergeParams: true })
const showCampgrounds = require('./multi_showCampgrounds')
const showCampground = require('./single_showCampground')
const form_addCamp = require('./form_addCamp')
const form_updateCamp = require('./form_updateCamp')
const handler_addCamp = require('./handler_addCamp')
const handler_deleteCamp = require('./handler_deleteCamp')
const handler_updateCamp = require('./handler_updateCamp')

const isLoggedIn = require("../../middleware/isLoggedin");
const setMulter = require("../../middleware/setMulter");
const upload = setMulter(multer);

// ROOT: /campgrounds/camps

router
    .get('/', showCampgrounds)
    .get('/new', form_addCamp)
    .get('/:id', showCampground)
    .get('/:id/edit', form_updateCamp)
    .post('/new', isLoggedIn, upload.single('image'), handler_addCamp)
    .delete(':id', handler_deleteCamp)
    .put('/:id/edit', handler_updateCamp)

module.exports = router