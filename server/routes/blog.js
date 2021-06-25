const express = require('express');
const router = express.Router();
const blogService = require('../services/blog')

const imageUpload = require('../middlewares/blog-upload')

router.route('').post(blogService.addBlog)
    .get(blogService.getAll)
router.route('/:id').get(blogService.getById)
    .put(blogService.updateOne)
    .delete(blogService.deleteOne)
router.route('/slug/:id').get(blogService.getById)

router.route('/image').post(imageUpload.single('cover'), function (req, res, next) {
    /* if (err) {
        console.log(err)
        res.json({
            success: false,
            errors: {
                title: "Image Upload Error",
                detail: err.message,
                error: err,
            },
        });
        return
    } */
    res.json({
        url: req.file ? req.protocol + "://" + req.get("host") + "/assets/blog/" + req.file.filename : ''
    })
})
module.exports = router;