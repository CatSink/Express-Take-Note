const app = require('express').Router();
const store = require('../db/store');

//get
app.get('/notes', (req, res) => {
    store.getallnotes()
    .then((notes) => {
        return res.json(notes)
    })
    .catch((err) => res.status(500).json(err))
});

//post
app.post('/notes', (req, res) => {
    store.addNote(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err))
});
app.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id)
    .then(() => res.json({ok:true}))
    .catch((err) => res.status(500).json(err))
});



module.exports = router