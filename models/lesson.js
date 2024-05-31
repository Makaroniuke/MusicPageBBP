const { string } = require('joi')
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LessonSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    preferences: {
        type: String
    },
    status: {
        type: String,
        default: 'Approved'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    feedbackTrack: {
        type: Schema.Types.ObjectId,
        ref: 'Track'
    }

})

module.exports = mongoose.model('Lesson', LessonSchema)
