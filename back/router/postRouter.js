// routes/fileRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const {
    createPost, getAllPosts, authorPosts,
    likePost
} = require('../controller/postController');

const { authMiddleware } = require('../Middleware/authMiddleware');


const postRouter = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../uploads/')); // Adjust the destination path
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Initialize the upload variable
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB (in bytes)
    },
});

// File upload route
postRouter.post('/create', authMiddleware, upload.single('myImage'), createPost);
postRouter.get('/', getAllPosts)
postRouter.get('/user/:creator', authorPosts)
postRouter.put('/like/:postID', authMiddleware, likePost)

module.exports = { postRouter } 
