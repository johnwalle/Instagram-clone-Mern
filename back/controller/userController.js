const User = require('../models/userSchema');
const Post = require('../models/postSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
require("dotenv").config()
// Register user
// POST: api/user/register
// Unprotected
const registerUser = async (req, res) => {

    const { fullName, email, username, password } = req.body
    try {

        // check if all the fields are filled
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ message: "Fill all the fields." })
        }


        // check whether the email exists or not
        const emailExist = await User.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: "User already registered." })
        }

        // check whether the username is occupied or not
        const unOccupied = await User.findOne({ username })
        if (unOccupied) {
            return res.status(400).json({ message: "The username is already occupied. " })
        }


        //  check if fullname contains last name 

        const nameParts = fullName.trim().split(' ');

        if (nameParts.length < 2) {
            return res.status(400).json({ message: "Full name should contain a last name." })
        }


        // check the password strength 
        if (password.length < 8) {
            return res.status(400).json({ message: "Password should be at least 8 characters long." })
        }

        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password should contain at least one uppercase letter.' })

        }

        if (!/\d/.test(password)) {
            return res.status(400).json({ message: "Password should contain at least one number." })
        }

        // hash the password


        const salt = await bcrypt.genSalt(10);   // generate salt
        const hashedPassword = await bcrypt.hash(password, salt)  // hashing(decoding) the password

        // creating the user
        const newUser = await User.create({
            email,
            fullName,
            username,
            password: hashedPassword
        })

        return res.status(200).json({
            id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email,
            token: genToken(newUser._id),
            posts: newUser.posts,
            followers: newUser.followersCount,
            followings: newUser.followingsCount,
            bio: newUser.bio,
            avatar: newUser.avatar

        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while registering the user.' });
    }
};

// Login user
// POST: api/user/login
// Unprotected

const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;

        // Find the user by email or username
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid email or username." });
        }

        // Compare the provided password with the stored hashed password
        const matchPass = await bcrypt.compare(password, user.password);

        if (!matchPass) {
            // Passwords don't match
            return res.status(401).json({ message: 'Invalid password.' });
        }

        // Passwords match, generate a token
        const token = genToken(user._id);



        // Return user data and token
        return res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token: token,
            posts: user.posts,
            followers: user.followersCount,
            followings: user.followingsCount,
            bio: user.bio,
            avatar: user.avatar
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error while logging in the user.' });
    }
};

// EDITING PROFILE


const editProfile = async (req, res) => {
    const { fullName, username, bio } = req.body;

    try {
        const user = await User.findOne({ username });


        if (user && user.username === username && user._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({ message: 'Username already taken.' });
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, {
            fullName,
            username,
            bio
        }, { new: true }).select('-password');

        if (!updatedUser) {
            return res.status(200).json({ message: "No user found to update." });
        }

        return res.status(200).json({
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            email: updatedUser.email,
            token: genToken(updatedUser._id),
            posts: updatedUser.posts,
            followers: updatedUser.followersCount,
            followings: updatedUser.followingsCount,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while updating the user profile." });
    }
};

//  change avatar

const changeAvatar = async (req, res) => {
    try {
        // Check if an image was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "No avatar uploaded." });
        }

        // Get the file path of the uploaded image
        const imagePath = req.file.filename;


        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { avatar: imagePath },
            { new: true }
        );
        return res.status(200).json({
            id: updatedUser._id,
            fullName: updatedUser.fullName,
            username: updatedUser.username,
            email: updatedUser.email,
            token: genToken(updatedUser._id),
            posts: updatedUser.posts,
            followers: updatedUser.followersCount,
            followings: updatedUser.followingsCount,
            bio: updatedUser.bio,
            avatar: updatedUser.avatar
        }
        );
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to create post." });
    }
};




// GETTING ALL USERS
const getAllUsers = async (req, res) => {
    try {
        const allUser = await User.find().sort({ createdAt: -1 }).select('-password');
        return res.status(200).json(allUser);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal server error.' })
    }
}


// GETTING USER BY ID

const gettingSingleUser = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(id).select('-password');
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error." })
    }
}


// FOLLOWING  REQUEST


const followingRequest = async (req, res) => {
    const userID = req.user._id; // ID of the user who wants to follow
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        const follower = await User.findById(userID);

        if (!user) {
            return res.status(400).json({ message: "There is no user with this ID to follow." });
        }

        const isAlreadyFollowed = user.follower.includes(userID);
        const isAlreadyFollowing = follower.following.includes(id);

        if (isAlreadyFollowed) {
            // User is already followed by the requester
            const followerIndex = user.follower.indexOf(userID);
            const followingIndex = follower.following.indexOf(id);

            if (followerIndex !== -1) {
                user.follower.splice(followerIndex, 1);
                user.followersCount -= 1;
            }

            if (followingIndex !== -1) {
                follower.following.splice(followingIndex, 1);
                follower.followingsCount -= 1;
            }
        } else {
            // User is not followed by the requester
            user.follower.push(userID);
            user.followersCount += 1;
            follower.following.push(id);
            follower.followingsCount += 1;
        }

        await Promise.all([user.save(), follower.save()]);

        return res.status(200).json({ user, follower });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};

// GET FOLLOWERS
// GET: api/users/followers/:userID
// un protected

const getFollowers = async (req, res) => {
    const { userID } = req.params;

    try {
        const user = await User.findById(userID);

        if (!user) {
            return res.status(400).json({ message: 'No user found.' });
        }

        const followerIds = user.follower;
        const followers = await User.find({ _id: { $in: followerIds } }, 'avatar username fullName');

        return res.status(200).json({ followers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error while fetching followers.' });
    }
};

// GET FOLLOWERS
// GET: api/users/followings/:userID
// un protected

const getFollowings = async (req, res) => {

    const { userID } = req.params

    try {
        const user = await User.findById(userID)
        if (!user) {
            return res.status(200).json({ message: "No user found." })
        }
        const followingsID = user.following
        const followings = await User.find({ _id: { $in: followingsID } }, 'avatar username fullName')


        return res.status(200).json({ followings })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "error while fetching followings." })
    }
}

// SEARCH USERS BY THEIR USERNAME AND FULLNAME

const searchUser = async (req, res) => {
    const { search } = req.query;

    try {
        const users = await User.find({
            $or: [
                { username: { $regex: search, $options: 'i' } },
                { fullName: { $regex: search, $options: 'i' } },
            ],
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Error fetching users. Please try again.' });
    }
}


/// GENERATE USER
const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};


module.exports = {
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
};