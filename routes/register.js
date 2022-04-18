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
        if(error) return res.status(400).send(error.details[0].message)
        
        console.log("hello0")

        const user = await User.findOne({ email: req.body.email })
        console.log("hello1")
        if(user)
            return res.status(400).send(error.details[0].message)
            
        console.log("hello2")
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        console.log("hello")

        const new_user = new User({ 
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            confirm_password:hashedPassword
        })

        console.log(new_user)
        new_user.save().then(res.redirect('/login')).catch(err => console.log(err))

        
    } catch {
        res.redirect('/')
    }
})

module.exports = router