const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('MangoDB connected'))
    .catch(err => console.log('MangoDB failed to connect: ', err));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Testing')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

