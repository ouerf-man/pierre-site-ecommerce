const User = require('../models/Admin');
const secrets = require('../utils/secrets');
const roles = require('../utils/role');

const admin = async () => {
    const adminEmail = secrets.ADMIN.email;

    const options = {
        new: true,
        upsert: true
    }

    const query = {
        email: adminEmail
    }

    const body = {
        email: adminEmail,
        status: true
    }

    const foundUser = await User.findOneAndUpdate(query, { $set: body }, options);


    if (foundUser) {
        foundUser.password = secrets.ADMIN.password;
        foundUser.role = roles.SUPER_ADMIN;
        await foundUser.save();
        console.info('Admin is configured.');
    }
}

module.exports = admin;