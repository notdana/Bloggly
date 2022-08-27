const express = require('express')
const exph = require('express-handlebars')
const morgan = require('morgan')
const path = require('path')

const app = express()

//For the enviroment variables
const dotenv = require('dotenv')
dotenv.config({path: './config/config.env'})
const PORT = process.env.PORT || 3000 

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

app.listen(
    PORT, 
    console.log(`Server Running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    )