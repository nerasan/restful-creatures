const express = require('express')
const router = express.Router()
const fs = require('fs')  // file system, allows us to do crud actions on text files

// PRE-HISTORIC CREATURES GET ROUTE (INDEX)
router.get('/', (req, res)=>{
    // take the text from dinosaurs.json and store it in a variable
    let phistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(phistoricCreatures) // allows us to give this function a json object and it spits out a js object
    
    res.render('prehistoric-creatures/index', {creatures:phcData})
})

// PRE-HISTORIC CREATURES GET ROUTE (NEW)
router.get('/new', (req, res)=>{
    res.render('prehistoric-creatures/new')
})

// PRE-HISTORIC CREATURES GET ROUTE (SHOW)
router.get("/:idx", (req, res)=>{
    let phistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(phistoricCreatures)
    // get array index from url parameter
    let creatureIndex = req.params.idx
    res.render('prehistoric-creatures/show', {creature: phcData[creatureIndex], creatureId: creatureIndex})
})

// PRE-HISTORIC CREATURES POST ROUTE
router.post('/', (req, res)=>{
    let phistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let phcData = JSON.parse(phistoricCreatures)
    phcData.push(req.body) // push to new array
    // save the new array to json file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(phcData))
    // redirect to the GET /prehistoric-creatures route (index) 
    res.redirect('/prehistoric-creatures')
})

module.exports = router