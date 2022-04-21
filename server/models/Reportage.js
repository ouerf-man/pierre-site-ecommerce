const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const ReportageSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    slug : {
        type: String,
        unique: true,
        required: true
    },
    description : {
        type: String,
    },
    cover : String,
    publish: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });


module.exports = Reportages = mongoose.model("reportage", ReportageSchema);