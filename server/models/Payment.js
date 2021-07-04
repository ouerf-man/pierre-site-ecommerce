const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PaymentSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'account',
        required: true,
    },
    images: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'image'
    }],
    payment: Object,
    status : String , // confirmed, cancelled , pending
}, { timestamps: true });


module.exports = Payment = mongoose.model("payment", PaymentSchema);