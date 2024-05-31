const User = require('../models/user')
const nodeMailer = require('nodemailer')

module.exports.addUser = async (email, username, password)=>{
    if(username.length <= 20 && username.length > 0){
        const user = new User({ email, username, imageUrl: '' , recoveryCode: 0})
        const registeredUser = await User.register(user, password)
        await registeredUser.save()
        return true
    }
    return false
}


const sendEmail = async (transporter, mailOptions)=>{
    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.error(error)
    }
}


module.exports.forgotPassword = async(email)=>{
    var val = Math.floor(1000 + Math.random() * 9000);
    const transporter =  nodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth:{
            user: process.env.GMAIL,
            pass: process.env.GMAIL_KEY
        }
    })
    
    const mailOptions = {
        from: {
            name: 'Test',
            adress: process.env.GMAIL,
        },
        to: email,
        subject: 'Recovery email',
        text: `Hey. Here is your recovery email. Your recovery code is ${val}`,
        html: ''
    }
    await User.findOneAndUpdate({email: email}, {recoveryCode: val})
    await sendEmail(transporter, mailOptions)
}

