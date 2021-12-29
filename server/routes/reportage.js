const express = require('express');
const router = express.Router();
const reportageService = require('../services/reportage')

const imageUpload = require('../middlewares/upload')

router.route('').post(reportageService.addReportage)
    .get(reportageService.getAll)

router.route('/:slug').get(reportageService.getBySlug)
router.route('/id/:id').get(reportageService.getById).delete(reportageService.deleteOne)
router.route('/filter/:query').get(reportageService.filter)
router.route('/image/:id').get(reportageService.getPhotoById)
const fields = [{ name: 'tagged', maxCount: 1 }, { name: 'size1', maxCount: 1 }, { name: 'size2', maxCount: 1 }, { name: 'size3', maxCount: 1 }]

router.route('/:id/image').post(imageUpload.fields(fields), reportageService.addPhoto)
module.exports = router;