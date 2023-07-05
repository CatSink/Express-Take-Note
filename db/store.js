const fs = require('fs');
const util = require('util');
//helpers for random identifiers and promises 
const { v4: uuid } = require('uuid');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
//storage class for db storage ops
class Store {
    read() {
        return readFile('db/db.json', 'utf-8')
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }


    allNotes() {
        return this.read().then((notes) => {
            let allNotes;
            try {
                allNotes = [].concat(JSON.parse(notes))
            }
            catch (err) {
                allNotes = [];
            }
            return allNotes;
        })
    }
    addNotes(note) {
        const { title, text } = note
        if (!title || !text) {
            throw new err('Invalid entry.')
        }
        const newNote = { title, text, id: uuid() }
        return this.allNotes()
            .then((notes) => [...notes, newNote])
            .then((updateNotes) => this.write(updateNotes))
            .then(() => newNote)
    }


    deleteNotes(id) {
        return this.collectAllNotes()
            .then((notes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes))
    }
}
//Store class to handle note operations
module.exports = new Store();