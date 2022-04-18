const express = require('express')
const router = express.Router()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const authentication = require('../modules/authentication')

// Route for Login
router.get('/', authentication.checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

router.post('/', authentication.checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = router