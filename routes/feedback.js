const express = require('express')
const router = express.Router()
const feedbackController = require('../controllers/feedback')

const { isLoggedIn, isProducer } = require('../middleware')

const multer = require('multer')
const { audioStorage, imageStorage } = require('../cloudinary')
const audioUpload = multer({ storage: audioStorage })


router.route('/')
    .get(feedbackController.index)

router.route('/uploadTrack/:id')
    .get(isLoggedIn, feedbackController.uploadTrackForm)
    .post(isLoggedIn, audioUpload.single('track'), feedbackController.uploadTrack)

router.route('/new/:id')
.get(isLoggedIn, feedbackController.newForm)
    .post(isLoggedIn, isProducer, feedbackController.new)

router.route('/:id/edit')
    .get(isLoggedIn, isProducer, feedbackController.editForm)
    .put(isLoggedIn, isProducer, feedbackController.edit)

router.route('/details/:id')
    .get(isLoggedIn, feedbackController.feedbackDetails)

module.exports = router