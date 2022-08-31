const express = require('express')
const mongoose = require('mongoose')
const exph = require('express-handlebars')
const methodOverride = require('method-override')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')

const app = express()

//Body parser middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Method override
app.use(methodOverride(function (req,res){
    if(req.body && typeof req.body === 'object' && '_method' in req.body){
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

//For the enviroment variables
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const PORT = 8080 

//passport config
require('./config/passport')(passport)

//sessions
app.use(session({
    secret: 'potato',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({mongoUrl: process.env.MONGO_URI,})
}))

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

//FILE CREATED IN CONFIG FOLDER TO CONNECT DB
const connectDB = require('./config/db')
connectDB()


//In dev enviroment, use the dev morgan login
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//GLOBAL VARIABLES
app.use(function(req,res,next){
    res.locals.user = req.user || null
    next()
})

//HANDLEBAR HELPERS
const {formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

//HANDLEBARS
app.engine('.hbs', exph.engine({helpers: {formatDate, stripTags, truncate, editIcon, select}, defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine','hbs')

//Static Folder, makes it accessable
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'views'))
//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/blogs', require('./routes/blogs'))



app.listen(
    PORT, 
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )
