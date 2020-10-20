const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')  // file system, allows us to do crud actions on text files

app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware -- it makes req.body work
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>{
    res.render('home')
})

const dinosaurs = require('./controllers/dinosaurs')
const creatures = require('./controllers/prehistoric-creatures')

app.use('/dinosaurs', dinosaurs)
app.use('/prehistoric-creatures', creatures)

app.listen(8000, ()=>{
    console.log("you're listening to port 8000")
})