const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const CommentSchema = new Schema({
    author: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'account',
        required: true,
    },
    body: {
        required: true,
        type: String
    },
    replies: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'comment',
        }
    ],
}, { timestamps: true });


module.exports = Comments = mongoose.model("comment", CommentSchema);