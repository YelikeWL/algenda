const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const authentication = require('../modules/authentication')

const User = require('../models/users')

router.get('/', authentication.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', authentication.checkNotAuthenticated, async (req, res) => {
    const {name, email, password, confirm_password} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        // To change when we update with database
        const newUser = new User
        res.redirect('/login')
    } catch {
        res.redirect('/')
    }
})

module.exports = router