const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const CoeffSchema = new Schema({
    print : Number,
    web : Number,
    print_web: Number,
    national : Number,
    europe: Number,
    mondial: Number,
    double: Number,
    couverture : Number,
    pleine: Number,
    demi : Number,
    quart : Number,
    n1000: Number,
    n10000: Number,
    n100000: Number,
    ns100000: Number,
}, { timestamps: true });


module.exports = Coeff = mongoose.model("coeff", CoeffSchema);