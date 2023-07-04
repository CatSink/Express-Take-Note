const router = require('express').Router()
const db = require('../db/db.json')

//get
router.get('/notes', (req, res) => {
    db.getallnotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))
});

//post
router.post('/notes', (req, res) => {
    db.addnote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err))
});
router.delete('/notes/:id', (req, res) => {
    db.removeNote(req.params.id)
    .then(() => res.json({ok:true}))
    .catch((err) => res.status(500).json(err))
});

module.exports = router