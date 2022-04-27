const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


// Create Schema
const AdminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
}, { timestamps: true });

AdminSchema.pre('save', function save(next) {
    console.log('hashing')
    const account = this;

    if (!account.isModified('password')) { return next(); }

    bcrypt.genSalt(10, (errSalt, salt) => {
        if (errSalt) { return next(errSalt); }

        bcrypt.hash(account.password, salt, (errHash, hash) => {
            if (errHash) { return next(errHash); }

            console.log(hash)
            account.password = hash;
            next();
        });
    });
});

AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
    //console.log(this.password)
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

module.exports = Admin = mongoose.model("admin", AdminSchema);