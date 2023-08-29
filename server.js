const express = require('express');

const api = require('./public')

const PORT = process.env.PORT || 3001;

const app = express()

app.use(express.json());

app.use('/api', api);

 app.get('/', (req, res) =>
 res.sendFile('public/index.html'));

 app.get('/notes', (req, res) =>
 res.sendFile('/public/notes.html'))

 app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`))