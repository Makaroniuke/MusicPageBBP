

const profileService = require('../services/profileService')




module.exports.index = async (req, res) => {
    let [tracks, user] = await profileService.getAllTracks(req.params.id)
    res.render('profile', { tracks , user})
}

module.exports.addTrackForm = (req, res) => {
    res.render('profile/addTrack')
}

module.exports.addTrack =async (req, res) => {
    try{
        const { trackName, description } = req.body
        await profileService.addTrack(req.file.filename, trackName, description, req.file.path, req.user)
        req.flash('success', 'Track uploaded successfully')
        res.redirect(`/profile/${req.user.id}`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/profile/${req.user.id}`)
    }
    
}

module.exports.editTrackForm =  async (req, res) => {
    try{
        const track = await profileService.getTrack(req.params.id)
        if (!track) {
            req.flash('error', 'Cannot find this track')
            return res.redirect(`/profile/${req.user.id}`)
        }
        res.render('profile/editTrack', { track })
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/profile/${req.user.id}`)
    }
}

module.exports.editTrack = async (req, res) => {
    try{
        const { trackName, description } = req.body
        await profileService.editTrack(req.params.id, trackName, description)
        req.flash('success', 'Track updated successfully')
        res.redirect(`/profile/${req.user.id}`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/profile/${req.user.id}`)
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { id } = req.params;
        const track = await profileService.getTrack(id);
        if (!track) {
            req.flash('error', 'Cannot find this track')
            return res.redirect(`/profile`)
        }
        await profileService.deleteTrack(track, id)
        req.flash('success', 'Track deleted successfully')
        res.redirect(`/profile/${req.user.id}`)
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/profile/${req.user.id}`)
    }
}

module.exports.editProfileForm = async(req, res) => {
    res.render('profile/editProfile')
}

module.exports.editProfile = async (req, res) => {
    const {id} = req.params
    await profileService.editProfile(id, req.user.imageUrl,req.user.filename, req.file.filename, req.file.path)
    req.flash('success', 'Image uploaded successfully')
    res.redirect(`/profile/${id}`)
}