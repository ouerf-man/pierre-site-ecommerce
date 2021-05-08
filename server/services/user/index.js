const Account = require('../../models/Account')
const jwt = require('jsonwebtoken');
const secrets = require('../../utils/secrets')
//const crypto = require('crypto');

exports.signUp = async (req, res, next) => {
    const body = req.body

    const { email,
        password,
        company,
        country,
        adress,
        appartement,
        region,
        zipCode,
        phone,
        tva,
        username,
        firstName,
        lastName
    } = body

    if (!email || !password || !firstName || !lastName || !country) {
        res.status(400).json({
            success: false,
            message: "missing informations"
        })
        return
    }

    const foundAccount = await Account.findOne({ email });
    if (foundAccount) {
        res.status(400).json({
            success: false,
            message: 'Account already exists'
        })
        return
    }

    try {
        const account = await Account.create({
            email,
            password,
            company,
            country,
            adress,
            appartement,
            region,
            zip_code: zipCode,
            phone,
            tva,
            username,
            first_name: firstName,
            last_name: lastName
        })

        if (account) {
            res.status(201).json({
                success: true,
                message: "Successfully created!"
            })
            return
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "something went wrong!"
        })
        return
    }
}

exports.login = async (req, res, next) => {
    const {
        email,
        username,
        password
    } = req.body

    if ((!email && !username) || !password) {
        res.status(400).json({
            success: false,
            message: "missing informations"
        })
        return
    }

    let foundAccount
    if (email) {
        foundAccount = await Account.findOne({ email })
    } else {
        foundAccount = await Account.findOne({ username })
    }

    if (!foundAccount) {
        res.status(404).json({
            success: false,
            message: "User not found"
        })
        return
    }

    foundAccount.comparePassword(password, async (errPwd, isMatch) => {

        if (errPwd) {
            res.status(500).json({
                success: false,
                message: errPwd.message || 'Internal Server Error'
            });
            return
        }

        if (isMatch) {
            const data = foundAccount.toJSON();
            let payload = {
                id: data._id,
                email: data.email,
            }
            const token = jwt.sign(payload, secrets.secretOrKey, { expiresIn: 2629746 });

            payload = {
                ...payload,
                token,
                ...data,
                password: undefined,
                _id: undefined
            };

            res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                data: payload
            });
            return

        } else {
            res.status(400).json({
                success: false,
                message: 'Invalid Credentials'
            });
            return
        }
    });
}
