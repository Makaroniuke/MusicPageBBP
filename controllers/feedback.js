
const feedbackService = require('../services/feedbackService')


module.exports.index = async (req, res) => {
    const tracks = await feedbackService.getAllTracks()
    res.render('feedback', { tracks })
}


module.exports.newForm = async (req, res) => {
    const track = await feedbackService.getTrack(req.params.id)
    if (!track) {
        req.flash('error', 'Cannot find this track')
        return res.redirect(`/feedback`)
    }
    res.render('feedback/new', { track })
}

module.exports.new =  async (req, res) => {
    try{
        const { review } = req.body
        const { id } = req.params;
        const updatedTrack = await feedbackService.newFeedback(review, id)
        req.flash('success', 'Feedback added successfully')
        // return res.redirect(`/feedback/details/${updatedTrack._id}`)
        return res.redirect(`/lesson`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/feedback`)
    }
}

module.exports.uploadTrackForm = (req, res) => {
    res.render('feedback/uploadTrack')
}

module.exports.uploadTrack = async (req, res) => {
    try{
        const { trackName, description } = req.body
        const {id} = req.params
        await feedbackService.uploadTrack(id, req.file.filename, trackName, description, req.file.path, req.user)
        req.flash('success', 'Track uploaded successfully')
        res.redirect('/feedback')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/feedback`)
    }
}

module.exports.editForm = async (req, res) => {
    try{
        const track = await feedbackService.getTrackWithFeedback(req.params.id)
        if (!track) {
            req.flash('error', 'Cannot find this track')
            return res.redirect(`/feedback`)
        }
        res.render('feedback/edit', { track })
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/feedback`)
    }
}

module.exports.edit = async (req, res) => {
    try{
        const { review } = req.body
        const { id } = req.params;
        const updatedTrack = await feedbackService.editFeedback(id, review)
        req.flash('success', 'Feedback added successfully')
        return res.redirect(`/feedback/details/${updatedTrack._id}`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/feedback`)
    }
}

module.exports.feedbackDetails =  async (req, res) => {
    try{
        const track = await feedbackService.getTrackWithFeedback(req.params.id)
        if (!track) {
            req.flash('error', 'Cannot find this track')
            return res.redirect(`/feedback`)
        }
        res.render('feedback/details', { track })
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/feedback`)
    }
}