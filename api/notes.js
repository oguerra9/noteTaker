const notes = require('express').Router();
const fs = require('fs');
const genUID = require('generate-unique-id'); //npm package used to generate a unique id for each note saved



// reads the contents of the 'db.json' file, parses the information into the array of note objects, and returns the parsed data
notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
})


// receives a new note to save in the request body, adds it to the array of note objects found in the 'db.json' file, 
// and rewrites the 'db.json' file with the newly added note added to the array
notes.post('/', (req, res) => {
    // pulls the information needed to create a new note from the request
    const { title, text } = req.body;

    if (req.body) {
        // creates a new note based on the information found in the body of the request
        const newNote = {
            title, 
            text,
            id: genUID({
                length: 10,
            }),
        };
        // reads db.json file to get list of currenty saved notes
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // parses the data from the file to get an array of note objects
                let notesArr = JSON.parse(data);
                // adds the new note to the array
                notesArr.push(newNote);
                // rewrites the db.json file with the new note inside of the array
                fs.writeFile('./db/db.json', JSON.stringify(notesArr), (err) => 
                    err ? console.log(err) : console.log('Note saved!')
                )
            }
        })
        res.json(newNote)
    } else {
        res.error('Could not save note')
    }

})

// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. 
// To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, 
// and then rewrite the notes to the `db.json` file.
/*
app.delete('/api/person/:id', (req, res) => {
    //Work 
    const requestedPerson = PEOPLE.find(x => x.id == req.params.id)

    PEOPLE = PEOPLE.filter(x => x.id != req.params.id)

    //Output
    requestedPerson ? res.json({
        message: `Person ${requestedPerson.firstName}(${requestedPerson.id}) was removed successfully..`,
        status: true
    }) :

        res.json({
            message: `Person was not found..`,
            status: false
        })
})

*/


notes.delete('/:id', (req, res) => {
    const deleteId = req.params.id;

    if (deleteId) {
        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                let notesArr = JSON.parse(data);
                const deleteNote = notesArr.find(note => note.id == deleteId)

                notesArr = notesArr.filter(note => note.id != deleteId)

                fs.writeFile('./db/db.json', JSON.stringify(notesArr), (err) => 
                    err ? console.log(err) : console.log('Note deleted!')
                )

            }
        })
        res.json('note deleted')

    } else {
        res.error('Note not found')
    }
})


module.exports = notes;