if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const bookRouter = require('./routes/books')
// const methodOverride = require('method-override')

const bodyParser = require('body-parser')
 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
// app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(express.urlencoded({limit: '10mb', extended: false}))
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
}) 
const db = mongoose.connection;
db.on('error', error => console.log(error))
db.once('open', () => console.log('connected to mongoose db'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)
app.use('/books', bookRouter)
 
app.listen(process.env.PORT || 3000, () => { 
    console.log(`Server running on Port: ${process.env.PORT}`) 
})     