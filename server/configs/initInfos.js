const Infos = require('../models/WebSiteInfos')

const infos = async () => {
    const foundInfos = await Infos.findOne({})
    if (foundInfos) {
        return
    }
    console.log('setting infos')
    await Infos.create({
        title : 'Lorem ipsum',
        description: 'lorem ipsum diamit lendra',
        cgv: '',
        about : ''
    })

}

module.exports = infos