const mongoose = require('mongoose')

const passportLocalMongoose = require('passport-local-mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    imageUrl:{
        type: String
    },
    filename:{
        type: String
    },
    recoveryCode:{
        type: Number
    },
    role: {
        type: String,
        enum: ['User', 'Producer', 'Administrator'],
        default: 'User'
    }
})


//passportLocalMongoose automatiskai prides
// username ir password ir uztikrins kasd butu unikalus
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema)
