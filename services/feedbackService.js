const Feedback = require('../models/feedback')
const Track = require('../models/track')
const Lesson = require('../models/lesson')

module.exports.getAllTracks = async ()=>{
    return await Track.find({forFeedback: true}).populate('feedback').populate('author')
}

module.exports.getTrack = async (id)=>{
    return await Track.findById(id).populate('author')
}

module.exports.getTrackWithFeedback = async (id)=>{
    return await Track.findById(id).populate('author').populate('feedback')
}

module.exports.uploadTrack = async (lessonId, filename, trackName, description, url, user)=>{
   
    const track = new Track({ filename: filename, name: trackName, description: description, forFeedback: true, url: url, author: user })
    await track.save()
    const lesson = await Lesson.findByIdAndUpdate(lessonId, {feedbackTrack: track})
    await lesson.save()
}

module.exports.newFeedback = async (review, id)=>{
    const feedback = new Feedback({review: review })
    await feedback.save()
    const updatedTrack = await Track.findByIdAndUpdate(id, {feedback: feedback})
    await updatedTrack.save()
    return updatedTrack
}

module.exports.editFeedback = async (id, review)=>{
    const track = await Track.findById(id).populate('feedback')
    const feedback = await Feedback.findById(track.feedback.id)
    feedback.review = review;
    await feedback.save()
    const updatedTrack = await Track.findByIdAndUpdate(id, {feedback: feedback})
    return updatedTrack
}



