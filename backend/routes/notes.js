const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/note');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addnote', fetchuser, [
    body('title').exists(),
    body('description').exists()
], async (req, res) => {
    try {
        const { title, description } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internadl Server Error");
    }
})

router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description } = req.body;
    try {
        const newNote = {}
        if (title){newNote.title = title}
        if(description){newNote.description = description}
        let note = await Note.findById(req.params.id);
        console.log(note.user.toString())
        console.log(req.user.id)
        console.log(req.params.id)
        if(note.user.toString()!== req.user.id){
            return res.status(401).send("Not Allowed");
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internadl Server Error");
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not found');
        }
        if(note.user.toString()!== req.user.id){
            return res.status(404).send('Not Allowed');
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"Success": "Note has been deleted", note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router