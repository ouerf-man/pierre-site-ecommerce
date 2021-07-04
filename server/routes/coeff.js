const express = require('express');
const router = express.Router();
const Coeff = require('../models/Coeff')

router.route('/')
    .get(async (req, res, next) => {
        try {
            const coeffs = await Coeff.findOne({});
            return res.status(200).json({
                success: true,
                data: coeffs
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    })

router.route('/:id')
    .put(async (req, res, next) => {
        const body = req.body
        var options = { new: true },
            query = { _id: req.params.id }
        for (var propName in body) {
            if (body[propName] === null || body[propName] === undefined) {
                delete body[propName];
            }
        }
        try {
            const coeff = await Coeff.findOneAndUpdate(query, body, options)
            return res.status(200).json({
                success: true,
                data: coeff
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    })

module.exports = router;