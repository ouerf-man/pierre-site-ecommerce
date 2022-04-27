const Admin = require("../../models/Admin");
const Token = require("../../models/Token");
const jwt = require("jsonwebtoken");
const secrets = require("../../utils/secrets");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../../helpers/sendEmail");
const path = require("path");
const jade = require("jade");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(200).json({
      success: false,
      message: "missing informations",
    });
    return;
  }

  let foundAccount = await Admin.findOne({ email });
  if (!foundAccount) {
    res.status(200).json({
      success: false,
      message: "Admin not found",
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
        role: data.role,
      };
      const token = jwt.sign(payload, secrets.secretOrKey, {
        expiresIn: 86400,
      });

      payload = {
        ...payload,
        token,
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
  const user = await Admin.findOne({ email: req.query.email });

  if (!user) {
    return res.status(200).json({
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
  const link = `${secrets.ADMIN_PAGE_HOSt}/#/?token=${resetToken}&id=${user._id}`;
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
      return res.status(200).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }
    const isValid = await bcrypt.compare(
      req.body.token,
      passwordResetToken.token
    );
    if (!isValid) {
      return res.status(200).json({
        success: false,
        message: "Invalid or expired password reset token",
      });
    }
    const user = await Admin.findOne({ _id: req.body.userId });
    const userObject = new Admin(user);
    userObject.password = req.body.password;
    userObject.save();
    await sendEmailHelper(
      userObject.email,
      "",
      "../../views/resetPasswordDone.jade"
    );
    await passwordResetToken.deleteOne();
    res.status(200).json({
      success: true,
      message: "Reset password done",
    });
  } catch (e) {
    return res.status(500).json({
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
