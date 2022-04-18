if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Libraries
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
// const methodOverride = require('method-override')

const app = express()

// Passport Config
const initializePassport = require('./modules/passport-config')
initializePassport(
    passport,
    email => users.find(user => user.email == email), //To change with database
    id => users.find(user => user.id == id) //To change with database
)

// Database config 
const connect = require('./modules/db')
connect()

// Routes
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const userRouter = require('./routes/user')


// Setting variables
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static('public'))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global variables
// app.use(function(req, res, next) {
//     res.locals.success_msg = req.flash('success_msg')
//     res.locals.error_msg = req.flash('error_msg')
//     res.locals.error = req.flash('error')
//     next()
// })

// Routes
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/user', userRouter)

// app.use(methodOverride('_method'))

// app.delete('/logout', (req, res) => {
//     req.logOut()
//     res.redirect('/login')
// })





app.listen(process.env.PORT || 3000, () => console.log('Server Started'))
