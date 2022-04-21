const Admin = require("../../models/Admin");
const jwt = require("jsonwebtoken");
const secrets = require("../../utils/secrets");

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email|| !password) {
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
          role: data.role
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

