const  express = require('express');
const router = express.Router();
const { v4: uuidv4 }= require('uuid');
const {readFromFile, writeToFile, readAndAppend} = require('../helpers/fsUtils');

router.get('/notes',(req,res) => {
    console.info(req);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/notes',(req,res) => {
    const {title, text} = req.body;
    if (title&&text) {
    const newMemo = { 
        title:title,
         text:text,
        id: uuidv4()
    }
    readAndAppend(newMemo,'./db/db.json');

    const response = {
        status: 'success',
        body: newMemo,
    };
    res.json(response);
} 
});

router.delete('/notes/:id',(req,res) => {
    const deleteMemo = req.params.id;
    readFromFile('./db/db.json').then((data) => JSON.parse(data))
    .then((notes) => {
        const updateMemo = notes.filter((note) => note.id === deleteMemo);
     writeToFile('./db/db.json', updateMemo);
     res.json({
        status: 'success',
        message: `${deleteMemo} was deleted successfully`,
     });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
