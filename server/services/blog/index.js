const Blog = require('../../models/Blog')
const removeUmlauts = require('../../helpers/removeUmlauts')
const Comment = require('../../models/Comment')
const Account = require('../../models/Account')

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

exports.updateOne = async (req, res, next) => {
    const body = req.body
    var options = { new: true },
        query = { _id: req.params.id },
        update = {
            title: body.title,
            description: body.description,
            cover: body.cover
        }
    for (var propName in update) {
        if (update[propName] === null || update[propName] === undefined) {
            delete update[propName];
        }
    }
    try {
        const blog = await Blog.findOneAndUpdate(query, update, options)
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

exports.deleteOne = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
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

exports.getBySlug = async (req, res, next) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate({
            path: 'comments',
            populate: [
                {
                    path: 'author',
                    model: Account
                }, {
                    path: 'replies',
                    model: Comment,
                    populate: {
                        path : 'author',
                        model: Account
                    }
                }
            ]
        })
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

exports.comment = async (req, res, next) => {
    try {
        let blog
        if (req.body.commentId) {
            const newComment = await Comment.create({
                author: req.body.author,
                body: req.body.body,
            })
            await Comment.findByIdAndUpdate(req.body.commentId, { $push: { replies: newComment._id } }, { new: true })
            blog = await Blog.findOne({ slug: req.params.slug })
        } else {

            const comment = await Comment.create({
                author: req.body.author,
                body: req.body.body,
            })
            blog = await Blog.findOneAndUpdate({ slug: req.params.slug }, { $push: { comments: comment._id } }, { new: true })
        }

        return res.status(200).json({
            success: true,
            data: blog
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}