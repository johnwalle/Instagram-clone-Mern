const express = require('express');
const multer = require("multer")
const path = require('path');
const userRouter = express.Router();
const { authMiddleware } = require('../Middleware/authMiddleware.js')
const {
    registerUser,
    loginUser,
    getAllUsers,
    gettingSingleUser,
    editProfile,
    changeAvatar,
    followingRequest,
    getFollowers,
    getFollowings,
    searchUser

} = require('../controller/userController');

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



userRouter.put('/change-avatar', authMiddleware, upload.single('myAvatar'), changeAvatar);
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', getAllUsers);
userRouter.get('/:id', gettingSingleUser)
userRouter.put('/edit-profile', authMiddleware, editProfile)
userRouter.put('/follow/:id', authMiddleware, followingRequest)
userRouter.get('/:userID/followers', getFollowers);
userRouter.get('/:userID/followings', getFollowings);
userRouter.get('/search/users', searchUser)

module.exports = { userRouter };