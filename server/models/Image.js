const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const ImageSchema = new Schema({
    reportage: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'reportage',
        required: true,
    },
    tagged: String,
    size1: String,
    size2: String,
    size3: String
}, { timestamps: true });


module.exports = Images = mongoose.model("image", ImageSchema);