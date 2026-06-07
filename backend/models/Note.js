const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// creates a format for notes 
const noteSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;