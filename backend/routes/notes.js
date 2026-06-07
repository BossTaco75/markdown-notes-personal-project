//handles the CRUD (Create, Read, Update, Delete) operations 

const router = require('express').Router();
let Note = require('../models/Note');

//finds all notes 
router.route('/').get((req, res) => {
    Note.find()
        .sort({ updatedAt: -1 }) //displays most recent note first 
        .then(notes => res.json(notes))
        .catch(err => res.status(400).json('Error: ' + err));
});
//saves a new note 
router.route('/add').post((req, res) => {
    //gets content from request
    const title = req.body.title;
    const content = req.body.content;
    const tags = req.body.tags || [];

    const newNote = new Note({  //creates new note from requested content 
        title,
        content,
        tags,
    });

    newNote.save()
        .then(() => res.json('Noted'))
        .catch(err => res.status(400).json('Error: ' + err));
})
//find a note by id 
router.route('/:id').get((req, res) => {
    Note.findById(req.params.id)
        .then(note => res.json(note))
        .catch(err => res.status(400).json('Error: ' + err));
});
//find a note by id then delete
router.route('/:id').delete((req, res) => {
    Note.findByIdAndDelete(req.params.id)
        .then(() => res.json('Note Deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//find note by id and update 
router.route('/update/:id').get((req, res) => {
    Note.findbById(req.params.id)   //calls findById and sets note contents to reqested content
        .then(note => {
            note.title = req.body.title;
            note.content = req.body.content;
            note.tags = req.body.tags;

            note.save() //calls save
                .then(() => res.json("Note Updated"))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;