const express = require('express')
const dotenv = require('dotenv')
const exph = require('express-handlebars')
//FILE CREATED IN CONFIG TO CONNECT DB
const connectDB = require('./config/db')
//MORGAN FOR LOGIN
const morgan = require('morgan')


//LOAD CONFIG
dotenv.config({path: './config/config.env'})

connectDB()

const app = express()

//only run in dev mode
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//HANDLEBARS
app.engine('.hbs', exph.engine({defaultLayout: 'main',extname: '.hbs'}))
app.set('view engine','hbs')

//Routes
app.use('/',require('./routes/index'))

const PORT = process.env.PORT || 3000 

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`))