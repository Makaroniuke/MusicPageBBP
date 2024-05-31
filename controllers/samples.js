const Sample = require('../models/sample')
const User = require('../models/user')
const { cloudinary } = require('../cloudinary')
const samplesService = require('../services/samplesService')




module.exports.index = async (req, res) => {
    const{ type} = req.query
    const samples = await samplesService.getSamples(type)
    res.render('samples', { samples })
}

module.exports.newForm = (req, res) => {
    res.render('samples/new')
}

module.exports.new =  async (req, res) => {
    try{
        const { sampleName, type, key } = req.body
        const url = req.file.path
        const filename = req.file.filename
        await samplesService.addSample(req.user.id, sampleName, type, key, url, filename) 
        req.flash('success', 'Sample added successfully')
        res.redirect('/samples')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/samples`)
    }
}

module.exports.delete = async (req, res) => {
    try{
        const { id } = req.params;
        const sample = await samplesService.getSample(id)
        if (!sample) {
            req.flash('error', 'Cannot find this sample')
            return res.redirect(`/samples`)
        }
        await samplesService.deleteSample(id, sample.filename)
        req.flash('success', 'Sample deleted successfully')
        res.redirect('/samples')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/samples`)
    }
}

module.exports.editForm = async (req, res) => {
    try{
        const { id } = req.params;
        const sample = await samplesService.getSample(id)
        if (!sample) {
            req.flash('error', 'Cannot find this sample')
            return res.redirect(`/samples`)
        }
        res.render('samples/edit', {sample})
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/samples`)
    }
}

module.exports.edit = async (req, res) => {
    try{
        const{sampleName, type, key} = req.body
        const { id } = req.params;
        await samplesService.editSample(id, sampleName, type, key)
        req.flash('success', 'Sample updated successfully')
        res.redirect('/samples')
    }catch(e){
        req.flash('error', 'Something went wrong')
        return res.redirect(`/samples`)
    }
}