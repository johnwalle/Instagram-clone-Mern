const { Schema, model } = require('mongoose');

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: {
        type: Number,
        default: 0
    },
    follower: {
        type: Array,
        default: []
    },
    followersCount: {
        type: Number,
        default: 0
    },
    followingsCount: {
        type: Number,
        default: 0
    },
    following: {
        type: Array,
        default: []
    },
    mycomments: {
        type: String,
    },
    bio: {
        type: String
    },
    avatar: {
        type: String
    }
}, { timestamps: true });



module.exports = model('User', userSchema);