const express = require('express')
const router = express.Router();

var {getAllNotes,getSinglenote,createNote} = require('./database')


app.get('/notes',async(req,res) => {
    const notes = await getAllNotes()
    res.send(notes)
  })

module.exports = router