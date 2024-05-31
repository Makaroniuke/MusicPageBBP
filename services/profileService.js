const Track = require('../models/track')
const User = require('../models/user')
const { cloudinary } = require('../cloudinary')

module.exports.getAllTracks = async (id)=>{
    const user = await User.findById(id)
    const tracks = await Track.find({ forFeedback: false , author: user})
    return [tracks, user] 
}

module.exports.addTrack = async (filename, trackName, description, url, user)=>{
    const track = new Track({ filename: filename, name: trackName, description: description, forFeedback: false, url: url, author: user})
    await track.save()
}

module.exports.getTrack = async (id)=>{
    const track = await Track.findById(id)
    return track
}

module.exports.editTrack = async (id, trackName, description)=>{
    if(description.length != 0){
        const track = await Track.findByIdAndUpdate(id, {trackName: trackName, description: description })
        await track.save()
    }
}

module.exports.deleteTrack = async (track, id)=>{
    await cloudinary.uploader.destroy(track.filename)
    await Track.findByIdAndRemove(id);
}

module.exports.editProfile = async(id, imageUrl, userFilename, filename, url)=>{
    if(imageUrl == ''){
        await User.findByIdAndUpdate(id, {filename: filename,  imageUrl: url})
    }else{
        await cloudinary.uploader.destroy(userFilename, {"resource_type": "image"})
        await User.findByIdAndUpdate(id, {filename: filename,  imageUrl: url})
    } 
}