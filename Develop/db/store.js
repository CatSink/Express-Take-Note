const util = require('util');
const fs = require('fs');

// unique id generator per slack notes
const uuidv1 = require('uuid/v1'); 

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf8');
    }
    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            return JSON.parse(notes) || [];
  })}}

module.exports = new Store();