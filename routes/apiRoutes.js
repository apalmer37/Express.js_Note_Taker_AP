const fs = require("fs");
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');

module.exports = (app) => {
    const notes = require('../db/db.json');
    // GET request for ALL notes
    app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  
    // Sending all notes to the client
    return res.json(notes);
  });


  // GET request for a single note
app.get('/api/notes/:id', (req, res) => {
    if (req.body && req.params.id) {
      console.info(`${req.method} request received to get a single a note`);
      const noteId = req.params.id;
      for (let i = 0; i < notes.length; i++) {
        const currentNote = notes[i];
        if (currentNote.id === noteId) {
          res.json(currentNote);
          return;
        }
      }
      res.json('Note ID not found');
    }
  });

  


  // POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Prepare a response object to send back to the client
    const { title, text } = req.body;
    // Check if there is anything in the response body
    if (title && text) {
      const resNote = {
        title: req.body.title,
        text: req.body.text,
        note_id: uuid(),
      };
      fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, resNote){
        if (err){
          console.log(err);
        } else {
          obj = JSON.parse(resNote);
          notes.push(resNote)
          noteString = JSON.stringify(resNote);
          console.log(JSON.stringify(resNote));
        
      fs.writeFile('./db/db.json', noteString, (err) =>
      err
        ? console.error(err)
        : console.log(
            `Note for ${resNote.title} has been written to JSON file`
          )
    );

    const response = {
      status: 'success',
      body: resNote,
    };

    console.log(response);
    res.json(response);
  }
});
    //   res.json(`note for ${response.data.notes} has been added!`);
    // } else {
    //   res.json('Request body must at least contain a note name');
    // };
}})};
