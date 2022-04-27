const Account = require("../../models/Account");
const Token = require("../../models/Token");
const jwt = require("jsonwebtoken");
const secrets = require("../../utils/secrets");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../helpers/sendEmail");
const path = require("path");
const jade = require("jade");

exports.signUp = async (req, res, next) => {
  const body = req.body;

  const {
    email,
    password,
    company,
    country,
    ville,
    adress,
    appartement,
    region,
    zipCode,
    phone,
    tva,
    username,
    firstName,
    lastName,
  } = body;

  if (!email || !password || !firstName || !lastName || !country) {
    res.status(200).json({
      success: false,
      message: "missing informations",
    });
    return;
  }

  const foundAccount = await Account.findOne({ email });
  if (foundAccount) {
    res.status(200).json({
      success: false,
      message: "Account already exists",
    });
    return;
  }

  try {
    const account = await Account.create({
      email,
      password,
      company,
      country,
      ville,
      adress,
      appartement,
      region,
      zip_code: zipCode,
      phone,
      tva,
      username,
      first_name: firstName,
      last_name: lastName,
    });
    const data = account.toJSON();
    let payload = {
      id: data._id,
      email: data.email,
    };
    const token = jwt.sign(payload, secrets.secretOrKey, {
      expiresIn: 2629746,
    });

    payload = {
      ...payload,
      token,
      ...data,
      password: undefined,
      _id: undefined,
    };
    if (account) {
      res.status(200).json({
        success: true,
        message: "Successfully created!",
        data: payload,
      });
      return;
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
    return;
  }
};

exports.login = async (req, res, next) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    res.status(200).json({
      success: false,
      message: "missing informations",
    });
    return;
  }

  let foundAccount;
  if (email) {
    foundAccount = await Account.findOne({ email });
  } else {
    foundAccount = await Account.findOne({ username });
  }

  if (!foundAccount) {
    res.status(200).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  foundAccount.comparePassword(password, async (errPwd, isMatch) => {
    if (errPwd) {
      res.status(500).json({
        success: false,
        message: errPwd.message || "Internal Server Error",
      });
      return;
    }

    if (isMatch) {
      const data = foundAccount.toJSON();
      let payload = {
        id: data._id,
        email: data.email,
      };
      const token = jwt.sign(payload, secrets.secretOrKey, {
        expiresIn: 2629746,
      });

      payload = {
        ...payload,
        token,
        ...data,
        password: undefined,
        _id: undefined,
      };

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: payload,
      });
      return;
    } else {
      res.status(200).json({
        success: false,
        message: "Invalid Credentials",
      });
      return;
    }
  });
};

exports.requestPasswordReset = async (req, res, next) => {
  const user = await Account.findOne({ email: req.query.email });

  if (!user) {
    res.status(404).json({
      success: false,
      message: "Utilisateur non trouvé",
    });
  }

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(secrets.BCRYPT_SALT));

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();
  console.log(secrets);
  const link = `${secrets.LANDING_PAGE_HOST}/login?token=${resetToken}&id=${user._id}`;
  await sendEmailHelper(user.email, link, "../../views/resetPassword.jade");
  res.status(200).json({
    success: true,
    message:
      "Un courriel a été envoyé à votre adresse email pour réinitialiser votre mot de passe.",
  });
};

exports.resetPassword = async (req, res, next) => {
  try {
    let passwordResetToken = await Token.findOne({ userId: req.body.userId });
    if (!passwordResetToken) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }
    const isValid = await bcrypt.compare(
      req.body.token,
      passwordResetToken.token
    );
    if (!isValid) {
      res.status(400).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }
    const account = await Account.findOneById(req.body.userId);
    const accountObject = new Account(account);
    accountObject.password = req.body.password;
    accountObject.save();

    await sendEmailHelper(
      accountObject.email,
      "",
      "../../views/resetPasswordDone.jade"
    );
    await passwordResetToken.deleteOne();
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

async function sendEmailHelper(email, link, templatePath) {
  try {
    const finalTemplatePath = path.resolve(__dirname, templatePath);
    const htmlTemplate = jade.renderFile(finalTemplatePath, {
      link,
    });
    await sendEmail(email, "Réinitialiser le mot de passe", "", htmlTemplate);
  } catch (error) {
    console.log(error);
  }
}
