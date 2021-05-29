const Blog = require('../../models/Blog')
const removeUmlauts = require('../../helpers/removeUmlauts')

exports.addBlog = async (req, res, next) => {
    const body = req.body

    const {
        title,
        description,
        cover
    } = body

    if (!title) {
        res.status(400).json({
            success: false,
            message: "missing informations"
        })
        return
    }
    let slug = removeUmlauts(title.split(' ').join('-'))
    const foundReportageBySlug = await Blog.findOne({ slug });
    if (foundReportageBySlug) {
        res.status(400).json({
            success: false,
            message: 'Blog already exists'
        })
        return
    }

    try {
        const reportage = await Blog.create({
            title,
            description,
            slug,
            cover
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
        const reportages = await Blog.find({});
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

exports.getById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        return res.status(200).json({
            success: true,
            data: blog
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}