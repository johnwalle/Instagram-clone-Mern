const { Schema, model } = require('mongoose');

const postSchema = Schema(
    {
        image: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
        },
        creator: {
            type: String,
            required: true,
        },
        like: {
            type: Array,
            default: [],
        },
        likesCount: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);


module.exports = model('Post', postSchema)