const { Schema, model } = require("mongoose")


const commentSchema = Schema({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    onPost: {
        type: String,
        required: true,
    },
    authorAvatar: {
        type: String,
    },
    authorID: {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = model("Comment", commentSchema)