const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const passport = require('passport')
const { isLoggedIn } = require('../middleware')



router.route('/register')
    .get(userController.registerForm)
    .post(userController.register)

router.route('/login')
    .get(userController.loginForm)
    .post(passport.authenticate('local', {failureFlash: 'Username or password is incorrect', failureRedirect: '/login' }), userController.login)

router.route('/logout')
    .get(isLoggedIn, userController.logout)

router.route('/forgotPassword')
    .get(userController.forgotPasswordForm)
    .post(userController.forgotPassword)

router.route('/recoverPassword')
    .post(userController.recoverPassword)

module.exports = router