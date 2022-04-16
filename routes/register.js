const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const authentication = require('../modules/authentication')

const users = []

router.get('/', authentication.checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

router.post('/', authentication.checkNotAuthenticated, async (req, res) => {
    const { name, email, password, confirm_password } = req.body
    let errors = []
    try {
        // Authenticate credentials for registration
        if(!name || !email || !password || !confirm_password) {
            errors.push({ msg: 'Please enter all fields' });
        }

        if(password != confirm_password) {
            errors.push({ msg: 'Passwords do not match' })
        }

        if(password.length < 6) {
            errors.push({ msg: 'Password must be at least 6 characters' });
        }

        if(users.find({ email: email })) {
            errors.push({ msg : 'Email already exists' })
        }

        if(errors.length > 0) {
            res.render('register.ejs', {
                errors,
                name,
                email,
                password,
                confirm_password
            })
        } else {
            

            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            // To change when we update with database
            users.push({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })
            res.redirect('/login')
        }
    } catch {
        res.redirect('/')
    }
})

module.exports = router