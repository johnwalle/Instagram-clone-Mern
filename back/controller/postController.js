const Post = require("../models/postSchema");
const User = require("../models/userSchema")

/// creating posts 
const createPost = async (req, res) => {
    try {
        const { caption } = req.body;

        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No image uploaded." });
        }

        // Get the file path of the uploaded image
        const imagePath = req.file.filename;

        // Create a new post instance
        const newPost = await Post.create({
            caption,
            image: imagePath,
            creator: req.user._id,
        });

        if (newPost) {
            const user = await User.findById(req.user._id);
            const countPost = user.posts + 1;
            await User.findByIdAndUpdate(
                req.user._id,
                { posts: countPost },
                { new: true }
            );
        }

        return res.status(200).json(newPost);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create post." });
    }
};

// GETTING AUHTOR POSTS
const authorPosts = async (req, res) => {
    const { creator } = req.params
    try {
        const posts = await Post.find({ creator }).sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(400).json({ message: "No post found." })
        }
        return res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};



const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        if (posts.length === 0) {
            return res.status(400).json({ message: "No post found." })
        }

        return res.status(200).json(posts)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." });
    }
};


// Route to handle liking/unliking a post
const likePost = async (req, res) => {
    try {
        const { postID } = req.params;
        const userId = req.user._id; // Assuming you have authentication middleware

        // Find the post by ID
        const post = await Post.findOne({ _id: postID });

        if (!post) {
            return res.status(404).json({ success: false, error: 'Post not found' });
        }

        // Check if the user has already liked the post
        const likedByUser = post.like && post.like.includes(userId);

        // Update the like count based on user action
        if (likedByUser) {
            // User has already liked the post, remove their like
            const index = post.like.indexOf(userId);
            if (index !== -1) {
                post.like.splice(index, 1);
                post.likesCount -= 1;
            }
        } else {
            // User has not liked the post, add their like
            post.like.push(userId);
            post.likesCount += 1;
        }

        // Save the updated post
        await post.save();

        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


module.exports = {
    createPost,
    getAllPosts,
    likePost,
    authorPosts
};