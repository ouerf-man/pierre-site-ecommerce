const Reportage = require('../../models/Reportage')
const Image = require('../../models/Image')
const removeUmlauts = require('../../helpers/removeUmlauts')

exports.addReportage = async (req, res, next) => {
    const body = req.body

    const {
        title,
        description
    } = body

    if (!title) {
        res.status(400).json({
            success: false,
            message: "missing informations"
        })
        return
    }
    let slug = removeUmlauts(title.split(' ').join('-'))
    const foundReportageBySlug = await Reportage.findOne({ slug });
    if (foundReportageBySlug) {
        res.status(400).json({
            success: false,
            message: 'Reportage already exists'
        })
        return
    }

    try {
        const reportage = await Reportage.create({
            title,
            description,
            slug
        })

        if (reportage) {
            console.log(reportage)
            res.status(200).json({
                success: true,
                message: "Successfully created!",
                data: reportage._id
            })
            return
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "something went wrong!"
        })
        return
    }
}


exports.getAll = async (req, res, next) => {
    try {
        const reportages = await Reportage.find({});
        return res.status(200).json({
            success: true,
            data: reportages
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

exports.addPhoto = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(404).json({
            success: false,
            message: 'not found'
        })
    }
    const reportage = await Reportage.findById(req.params.id)
    if (!reportage) {
        return res.status(404).json({
            success: false,
            message: 'Reportage not found'
        })
    }


    try {
        const count = await Image.find({ reportage: req.params.id }).countDocuments()

        const image = await Image.create({
            reportage: req.params.id,
            tagged: req.protocol + "://" + req.get("host") + "/assets/images/" + req.files['tagged'][0].filename,
            size1: req.protocol + "://" + req.get("host") + "/assets/images/" + req.files['size1'][0].filename,
            size2: req.protocol + "://" + req.get("host") + "/assets/images/" + req.files['size2'][0].filename,
            size3: req.protocol + "://" + req.get("host") + "/assets/images/" + req.files['size3'][0].filename,
        })

        if (count == 0 && image) {
            const reportageDoc = new Reportage(reportage)
            reportageDoc.cover = image.tagged
            await reportageDoc.save()
            console.log(reportageDoc)
        }

        if (image)
            console.log(image)
        res.status(200).json({
            success: true,
            message: 'successfully created!'
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: "something went wrong!"
        })
        return
    }
}

exports.getPhotoById = async (req, res, next) => {
    try{
        const image = await Image.findById(req.params.id)
        if(!image){
            return res.status(404).json({
                success: false,
                message: 'Image not found!'
            })
        }
        return res.status(200).json({
            success: true,
            image
        })
    }catch(e){
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        const blog = await Reportage.findOne({ slug: req.params.slug })
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: 'Reportage not found!'
            })
        }
        const image = await Image.find({ reportage: blog._id })
        const reportageFinal = {
            ...blog.toJSON(),
            images: image
        }
        console.log(reportageFinal)
        return res.status(200).json({
            success: true,
            data: reportageFinal
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}

exports.getById = async (req, res, next) => {
    try {
        const blog = await Reportage.findById(req.params.id)
        if (!blog) {
            res.status(404).json({
                success: false,
                message: 'Reportage not found!'
            })
        }
        const image = await Image.find({ reportage: blog._id })
        const reportageFinal = {
            ...blog.toJSON(),
            images: image
        }
        console.log(reportageFinal)
        return res.status(200).json({
            success: true,
            data: reportageFinal
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}