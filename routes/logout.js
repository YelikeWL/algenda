const express = require('express')
const router = express.Router()
const authentication = require('../modules/authentication')

router.get('/', authentication.checkAuthenticated, (req, res) => {
    req.logOut()
    res.redirect('/login')
})

module.exports = router