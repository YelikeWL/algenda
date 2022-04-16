const express = require('express')
const router = express.Router()
const authentication = require('../modules/authentication')

router.get('/', authentication.checkAuthenticated, (req, res) => {
    res.render('user.ejs')
})

router.post('/', authentication.checkAuthenticated, (res, req) => {
    // To be filled for the user page
})

module.exports = router