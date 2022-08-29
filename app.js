const express = require('express')
const mongoose = require('mongoose')
const exph = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')

const app = express()

//Body parser middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//For the enviroment variables
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const PORT = process.env.PORT || 3000 

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

//HANDLEBARS
app.engine('.hbs', exph.engine({defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine','hbs')

//Static Folder, makes it accessable
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/blogs', require('./routes/blogs'))



app.listen(
    PORT, 
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )