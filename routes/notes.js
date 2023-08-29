const fb = require('express').Router();

const uuid = require('../helpers/uuid')

const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

fb.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
})

fb.post('/', (req, res) => {
    console.info(`${req.method} request received to submit notes`);

    const {noteTitle, noteText} = req.body;

    if (noteTitle && noteText){
        const newNotes = {
            noteTitle,
            noteText,
            note_id: uuid(),
        }

        readAndAppend(newNotes, './db/db.json')

        const response = {
            status: 'success',
            body: newNotes,
        }

        res.json(response)
    }else{
        res.json('Error in posting feedback')
    }
})

module.exports = fb