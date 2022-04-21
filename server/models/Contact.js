const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const ContactMessageSchema = new Schema({
    author: {
        type: String,
        required: true,
    },
    email : {
        required: true,
        type : String,
    },
    subject : {
        required: true,
        type : String,
    },
    message: {
        required: true,
        type: String,
    },
}, { timestamps: true });


module.exports = Contact = mongoose.model("contactMessage", ContactMessageSchema);