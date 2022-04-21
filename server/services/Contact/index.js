const Message = require("../../models/Contact");

exports.addMessage = async (req, res, next) => {
  const body = req.body;

  const { author, email, subject, message } = body;

  if (!email || !message || !author) {
    res.status(400).json({
      success: false,
      message: "missing informations",
    });
    return;
  }
  try {
    const contact = await Message.create({
      author,
      email,
      subject,
      message,
    });

    if (contact) {
      console.log(contact);
      res.status(200).json({
        success: true,
        message: "Successfully created!",
        data: contact._id,
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "something went wrong!",
    });
    return;
  }
};

exports.deleteOne = async (req, res, next) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const reportages = await Message.find({});
    return res.status(200).json({
      success: true,
      data: reportages,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const blog = await Message.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};
