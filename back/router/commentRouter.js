const express = require('express')
const commentRouter = express.Router()
const { authMiddleware } = require('../Middleware/authMiddleware')

const {
    createComment,
    getPostComments
} = require("../controller/commentController");

commentRouter.post('/:postID/create-comments', authMiddleware, createComment)
commentRouter.get('/:postID/comments', getPostComments)


module.exports = {
    commentRouter
}


