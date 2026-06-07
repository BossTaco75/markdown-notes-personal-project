// importing node.js libaries 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); //gets connection string from .env

const app = express();  //sets up express for server connections 

// connect to Mango db 
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('MangoDB connected'))
    .catch(err => console.log('MangoDB failed to connect: ', err));

app.use(cors());
app.use(express.json());

const notesRouter = require('./routes/notes');
app.use('/api/notes', notesRouter);

app.get('/', (req, res) => {
    res.send('Testing')
});

// opens on port 5000 (http://localhost:500)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

