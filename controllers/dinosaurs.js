const express = require('express')
const router = express.Router()
const fs = require('fs')  // file system, allows us to do crud actions on text files

// DINO INDEX ROUTE
router.get('/', (req, res)=>{

    // take the text from dinosaurs.json and store it in a variable
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs) // allows us to give this function a json object and it spits out a js object

    // handle a query string if there is one
    console.log(req.query.nameFilter)
    let nameFilter = req.query.nameFilter 
    if(nameFilter) {  // this will only run if nameFilter is anything BUT undefined. aka as long as someone searches it. then it reassigns dinoData to only be an array of dinos whose name matches the query string name. and make it ignore case sensitive.
        dinoData = dinoData.filter((dino)=>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {dinosaurs:dinoData})
})

// DINO NEW ROUTE -- should go above the url with a parameter bc express reads top/down, has to be above show route
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// DINO SHOW ROUTE
router.get('/:idx', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    // get array index from url parameter
    let dinoIndex = req.params.idx
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

// DINO POST ROUTE
router.post('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body) // push the new dino to the array
    // save the new dinoData array to the dinosaurs.json file
    // JSON.stringify does the opposite of JSON.parse -- takes JS data back to JSON data
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))
    // redirect to the GET /dinosaurs route (index) 
    res.redirect('/dinosaurs')
})

module.exports = router

// -------- PREVIOUSLY IN INDEX.JS AND MOVED TO SORT IN CONTROLLERS
// changed from app. to router.
