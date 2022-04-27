const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


// Create Schema
const AccountSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    company: String,
    country: String,
    ville: String,
    adress: String,
    appartement: String,
    region: String,
    zip_code : String,
    phone: String,
    tva: String,
    username : String,
    first_name: String,
    last_name: String
}, { timestamps: true });

AccountSchema.pre('save', function save(next) {
    console.log('hashing')
    const account = this;

    if (!account.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (errSalt, salt) => {
        if (errSalt) { return next(errSalt); }

        bcrypt.hash(account.password, salt, (errHash, hash) => {
            if (errHash) { return next(errHash); }
            account.password = hash;
            next();
        });
    });
});

AccountSchema.methods.comparePassword = function (candidatePassword, cb) {
    //console.log(this.password)
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = Accounts = mongoose.model("account", AccountSchema);