const express = require('express');
const router = express.Router();
const Info = require('../models/WebSiteInfos')

router.route('/')
    .get(async (req, res, next) => {
        try {
            const infos = await Info.findOne({});
            return res.status(200).json({
                success: true,
                data: infos
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
            const info = await Info.findOneAndUpdate(query, body, options)
            return res.status(200).json({
                success: true,
                data: info
            })
        } catch (e) {
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
    })

module.exports = router;