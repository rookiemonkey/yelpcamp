const express = require('express')
const router = express.Router({ mergeParams: true })
const handler_addComment = require('./handler_addComment')
const handler_deleteComment = require('./handler_deleteComment')
const handler_updateComment = require('./handler_updateComment')

// ROOT: /campgrounds/camps/:id/comment

router
    .post('/', handler_addComment)
    .delete('/:comid', handler_deleteComment)
    .put('/:comid', handler_updateComment)

module.exports = router