const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//sujungti su api
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const audioStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'MusicPageAudio',
        allowedFormats: ['jpeg', 'png', 'jpg', 'wav', 'mp3'],
        resource_type: 'auto'
    }
})

const imageStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'MusicPageImage',
        allowedFormats: ['jpeg', 'png', 'jpg'],
        resource_type: 'image'
    }
})

module.exports = {
    cloudinary,
    audioStorage,
    imageStorage
}