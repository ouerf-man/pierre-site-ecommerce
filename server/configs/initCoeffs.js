const Coeff = require('../models/Coeff')

const coeff = async () => {
    const foundCoeff = await Coeff.findOne({})
    if (foundCoeff) {
        return
    }
    console.log('setting coeffs')
    await Coeff.create({
        print: 200,
        web: 100,
        print_web: 250,
        national: 1,
        europe: 1.5,
        mondial: 2,
        double: 2,
        couverture: 1.5,
        pleine: 1,
        demi: 0.8,
        quart: 0.7,
        n1000: 1,
        n10000: 1.5,
        n100000: 2,
        ns100000: 3
    })

}

module.exports = coeff