const express = require('express')
const router = express.Router()
const authentication = require('../modules/authentication')

// Welcome page or Home page
router.get('/', authentication.checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})

module.exports = router