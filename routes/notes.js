const fb = require('express').Router();

const uuid = require('../helpers/uuid')

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');

fb.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);

    readFromFile('./db/db.json')
    .then((data) => res.json(JSON.parse(data)))
})

fb.post('/', (req, res) => {
    console.info(`${req.method} request received to submit notes`);
    
    const {title, text} = req.body;

    if (title && text){
        const newNotes = {
            title,
            text,
            id: uuid(),
        }
        console.log(newNotes.id);
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

fb.delete('/:id', (req, res) => {
    deleteID = req.params.id
    readFromFile('./db/db.json')
    .then((data) => {
            let parseData = JSON.parse(data)
            let filterData = parseData.filter((note) => note.id !== deleteID)        
            writeToFile('./db/db.json', filterData) 
            res.json('note deleted')
        })
})

module.exports = fb