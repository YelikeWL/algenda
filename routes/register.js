const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const authentication = require('../modules/authentication')

const users = []

router.get('/', authentication.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', authentication.checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        // To change when we update with database
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/')
    }
})

module.exports = router