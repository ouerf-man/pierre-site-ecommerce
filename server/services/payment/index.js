const Payment = require('../../models/Payment')
const Reportage = require('../../models/Reportage')
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

exports.charge = async (req, res, next) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
    let { amount, id, account, images } = req.body;
    console.log("stripe-routes.js 10 | amount and id", amount, id);
    try {
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
            images
        })
        res.json({
            message: "Payment Successful",
            success: true,
            data: transaction
        });
    } catch (error) {
        console.log("stripe-routes.js 17 | error", error);
        res.json({
            message: error.raw.message,
            success: false,
        });
    }
}

exports.getTransactionsByAccount = async (req, res, next) => {
    try {
        const transactions = await Payment.find({ user: req.params.id }).populate({
            path: 'images',
            populate: {
                path: 'reportage',
                model: Reportage
            }
        })
        return res.status(200).json({
            success: true,
            data: transactions
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}