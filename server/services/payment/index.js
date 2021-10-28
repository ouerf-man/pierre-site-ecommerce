const Payment = require("../../models/Payment");
const Reportage = require("../../models/Reportage");
const Account = require("../../models/Account");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const { sendEmail } = require("../../helpers/sendEmail");
const jade = require("jade");
const path = require("path");
const Image = require("../../models/Image");

exports.charge = async (req, res, next) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id, account, images } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const accountDoc = await Account.findById(account);
    //const imagesDocs = await images.map(async e=>(await Image.findById(e)) )
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "EUR",
      description: "Pierre Gassin",
      payment_method: id,
      confirm: true,
    });
    const transaction = await Payment.create({
      status: "confirmed",
      payment,
      user: account,
      images: images.map((e) => e.id),
    });
    const imagesDocs = (await transaction.populate("images")).toJSON().images;
    if (payment) {
      let accountJSON = accountDoc.toJSON();
      console.log(images)
      await sendEmailHelper(
        accountJSON.email,
        accountJSON.first_name,
        accountJSON.last_name,
        accountJSON._id,
        new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })
          .format(new Date())
          .toString(),
        accountJSON.adress,
        accountJSON.zip_code,
        imagesDocs.map((e) => ({
          photo: e.name,
          prix: images.find((el) => el.id === e._id.toString()).prix,
          lien: e.size1
        })),
        amount,
        amount * 0.2,
        amount + amount * 0.2
      );
    }
    res.json({
      message: "Payment Successful",
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: error?.raw?.message,
      success: false,
    });
  }
};

exports.getTransactionsByAccount = async (req, res, next) => {
  try {
    const transactions = await Payment.find({ user: req.params.id }).populate({
      path: "images",
      populate: {
        path: "reportage",
        model: Reportage,
      },
    });
    return res.status(200).json({
      success: true,
      data: transactions,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
    });
  }
};

async function sendEmailHelper(
  email,
  prenom,
  nom,
  ref,
  clientRef,
  date,
  adresse,
  cp,
  images,
  totalHT,
  tva,
  total
) {
  try {
    const templatePath = path.resolve(__dirname, "../../views/devi.jade");

    const htmlTemplate = jade.renderFile(templatePath, {
      prenom,
      nom,
      ref,
      clientRef,
      date,
      adresse,
      cp,
      images,
      totalHT,
      tva,
      total,
    });
    await sendEmail(email, "Payment Pierre", "", htmlTemplate);
  } catch (error) {
    console.log(error);
  }
}
