const express = require('express')
const router = express.Router({ mergeParams: true })
const isLoggedIn = require("../../middleware/isLoggedin")
const isReviewExisiting = require("../../middleware/isReviewExisiting")
const get_allReviews = require('./get_allReviews')
const form_addReview = require('./form_addReview')
const form_updateReview = require('./form_updateReview')
const handler_addReview = require('./handler_addReview')
const handler_updateReview = require('./handler_updateReview')
const handler_deleteReview = require('./handler_deleteReview')

// ROOT: /campgrounds/camps/:id/reviews

router
    .get('/', isLoggedIn, get_allReviews)
    .post('/new', isLoggedIn, isReviewExisiting, handler_addReview)
    .get('/new', isLoggedIn, isReviewExisiting, form_addReview)
    .delete('/:reviewId', isLoggedIn, handler_deleteReview)
    .get('/:reviewId/edit', isLoggedIn, form_updateReview)
    .put('/:reviewId/edit', isLoggedIn, handler_updateReview)

module.exports = router