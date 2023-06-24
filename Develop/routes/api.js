const  express = require('express');
const router = express.Router();
const memo = require('../db/db.json');
const fs = require('fs');
const path = require('path');

const addNewMemo = (body,memoArray) => {
    const newMemo = body;
    if (!Array.isArray(memoArray)) memoArray = [];

    if (memoArray.length === 0) memoArray.push(0);

    body.id= memoArray[0];
    memoArray[0]++;

    memoArray.push(newMemo);
    fs.writeFile(path.join(__dirname,'../db/db.json'),JSON.stringify(memoArray, null, 2)
    );
    return newMemo;
};

const deleteMemo = (id,memoArray) => {
    for (let i=0;i<memoArray.length;i++) {
        let note = memoArray[i];

        if (note.id === id) {
            memoArray.splice(i,1);
            fs.writeFileSync(path.join(__dirname,'../db/db.json'),
            JSON.stringify(memoArray,null,2)
            );
            break;
           } 
        }
    };

router.get('/notes',(_req,res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
)

router.post('/notes',(req,res) => {
    const newMemo = addNewMemo(req.body,memo);
    res.json(newMemo);
});

router.delete('/notes/:id',(req,res) => {
    deleteMemo(req.params.id,memo);
    res.json(true);
});

module.exports = router;
