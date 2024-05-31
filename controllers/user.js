const User = require('../models/user')
const userService = require('../services/userService')



module.exports.registerForm = (req, res) => {
    res.render('register')
}

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        await userService.addUser(email, username, password)
        res.redirect('/')      
    } catch (e) {
        req.flash('error', e.message)
        res.redirect('/register') 
    }
}

module.exports.loginForm = (req, res) => {
    res.render('login')
}

module.exports.login = (req, res) => {
    // res.status(302).send({user: req.user})
    req.flash('success', 'Succesfully logged in')
    res.redirect('/')
}

module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    })
    res.redirect('/')
}

module.exports.forgotPasswordForm = (req,res)=>{
    res.render('forgotPassword')
}

module.exports.forgotPassword = async (req,res)=>{
    await userService.forgotPassword(req.body.email)
    res.render('recoverPassword', {email: req.body.email})  
}

module.exports.recoverPassword = async (req,res)=>{

    // User.findOne({ email: req.body.email, recoveryCode: req.body.code}, function (err, user) {
    //     if (!err) {
    //         user.setPassword(req.body.password, function (err) {
    //             if (!err) {
    //                 req.flash('success', 'Password changes succesfully')
    //                 res.redirect('/login')
    //             } else {
    //                 req.flash('error', 'Recovery code or password is wrong')
    //                  res.render('recoverPassword', {email: req.body.email})  
    //             }
    //         })
    //     } else {
    //         req.flash('error', 'Recovery code or password is wrong')
    //         res.render('recoverPassword', {email: req.body.email})  
    //     }
    // })

        const user = await User.findOne({ email: req.body.email, recoveryCode: req.body.code})
        await user.setPassword(req.body.password)
        await user.save()
        req.flash('success', 'Password changes succesfully')
        res.redirect('/login')
       
    
    
}