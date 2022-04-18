const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const authentication = require('../modules/authentication')

const { User, validate } = require('../models/users')

router.get('/', authentication.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', authentication.checkNotAuthenticated, async (req, res) => {
    try {
        
        const { error } = validate(req.body)
        if(error) 
            return res.status(400).send(error.details[0].message)

        const user = await User.findOne({ email: req.body.email })

        if(user)
            return res.status(400).send(error.details[0].message)

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const new_user = new User({ 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            confirm_password: hashedPassword
        })

        
        new_user.save().then(res.redirect('/login')).catch(err => console.log(err))

        
    } catch {
        res.redirect('/')
    }
})

module.exports = router