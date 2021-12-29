const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const WebSiteInfoSchema = new Schema({
    title: String,
    description:String,
    cgv: String,
    about: String
}, { timestamps: true });


module.exports = Infos = mongoose.model("infos", WebSiteInfoSchema);