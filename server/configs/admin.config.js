const User = require("../models/Admin");
const secrets = require("../utils/secrets");
const roles = require("../utils/role");

const admin = async () => {
  const adminEmail = secrets.ADMIN.email;
  const superAdminEmail = secrets.SUPER_ADMIN.email;

  const options = {
    new: true,
    upsert: true,
  };

  const query = {
    email: adminEmail,
  };
  const superQuery = {
    email: superAdminEmail,
  };

  const body = {
    email: adminEmail,
 };

  const superBody = {
    email: superAdminEmail,
  };

  const foundUser = await User.findOneAndUpdate(query, { $set: body }, options);
  const foundSUPER = await User.findOneAndUpdate(
    superQuery,
    { $set: superBody },
    options
  );

  if (foundUser && foundSUPER) {
    foundUser.password = secrets.ADMIN.password;
    foundUser.role = roles.ADMIN;
    foundSUPER.password = secrets.SUPER_ADMIN.password;
    foundSUPER.role = roles.SUPER_ADMIN;

    await foundUser.save();
    await foundSUPER.save();
    console.info("Admin is configured.");
    console.info("SUPER Admin is configured.");
  }
};

module.exports = admin;
