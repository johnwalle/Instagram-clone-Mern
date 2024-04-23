const Comment = require("../models/commentSchema")
const Post = require('../models/postSchema')
const User = require('../models/userSchema')

/// create a post on comments
const createComment = async (req, res) => {

    const { comment } = req.body
    const { postID } = req.params

    try {
        const post = await Post.findOne({ _id: postID })
        if (!post) {
            return res.status(400).json({ message: "No post to comment on with this ID." })
        }
        if (!comment) {
            return res.status(400).json({ message: "Please fill the comment section." })
        }

        const authorInfo = await User.findOne({ _id: req.user._id })

        const comments = await Comment.create({
            text: comment,
            author: authorInfo.username,
            authorAvatar: authorInfo.avatar,
            onPost: postID,
            authorID: authorInfo._id

        })

        const countComment = post.comments + 1;
        // Update the number of comments after a successful comment creation
        if (comments) {
            await Post.findByIdAndUpdate(
                { _id: postID },
                { comments: countComment },
                { new: true }
            );
        }
        return res.status(200).json(comments);

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error.' })
    }
}

const getPostComments = async (req, res) => {

    const { postID } = req.params

    try {
        const postComments = await Comment.find({ onPost: postID }).sort({ createdAt: -1 });

        if (postComments.length === 0) {
            return res.status(400).json({
                message:
                    "No comment found."
            })
        }
        return res.status(200).json(postComments)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error.' })
    }
}



module.exports = {
    createComment,
    getPostComments
}
