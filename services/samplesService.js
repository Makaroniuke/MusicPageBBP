const Sample = require('../models/sample')
const User = require('../models/user')
const { cloudinary } = require('../cloudinary')

module.exports.isSampleDataValid = (name, note)=>{
    const nameValid = (name.length <= 30 && name.length != 0) ? true : false
    const noteValid = note.length <= 10 ? true : false
    const isDataValid = nameValid && noteValid ? true : false
    return isDataValid
}

module.exports.getSamples = async (type)=>{
    if(type && type !== 'All'){    
        const samples = await Sample.find({type: type}).populate('author')
        return samples
    }
    const samples = await Sample.find({}).populate('author')
    return samples   
}

module.exports.getSample = async (id)=>{
    const sample = await Sample.findById(id);
    return sample
}

module.exports.addSample = async (id, sampleName, type, key, url, filename)=>{
    const user = await User.findById(id)
    const sample = new Sample({ name: sampleName, filename: filename, sampleUrl: url, type: type, key: key, author: user })
    await sample.save()
}


module.exports.deleteSample = async (id, filename)=>{
    await cloudinary.uploader.destroy(filename, {"resource_type": "video"})
    await Sample.findByIdAndRemove(id);
}

module.exports.editSample = async (id, sampleName, type, key)=>{
    await Sample.findByIdAndUpdate(id, {name:sampleName, type:type, key:key});

}
