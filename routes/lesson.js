const express = require('express')
const router = express.Router()
const lessonController = require('../controllers/lesson')
const { isLoggedIn, isProducer } = require('../middleware')

router.route('/lesson')
    .get(lessonController.index)

router.route('/bookedClasses')
    .get(isLoggedIn, lessonController.bookedClasses)

router.route('/allClasses')
    .get(isLoggedIn, isProducer, lessonController.allClasses)

router.route('/changeDate/:id/edit')
    .get(isLoggedIn, lessonController.changeDateForm)
    .put(isLoggedIn, lessonController.changeDate)

router.put('/lesson/:id', isLoggedIn, lessonController.cancelLesson)

router.post('/webhook', express.raw({type: 'application/json'}), lessonController.webhook);

module.exports = router