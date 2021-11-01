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
app.post('/api/notes', function (req, res) {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
  
    // Prepare a response object to send back to the client
    const { title, text } = req.body;
    // Check if there is anything in the response body
    if (title && text) {
      const resNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuid(),
      };
      // console.log(resNote);
      notes.push(resNote);
      const noteString = JSON.stringify(notes);
      res.json(notes);
      fs.writeFile('./db/db.json', noteString, err => {
      if (err){
        console.log(err)
       } else {
            `Note for ${resNote.title} has been written to JSON file`
    
      };
      fs.readFile('./db/db.json', 'utf8', function readFileCallback(err, data){
        if (err){
          console.log(err);
        } else {
          // console.log(resNote);
          // obj = JSON.parse(resNote);
          // notes.push(resNote);
          dataString = JSON.stringify(data);
          console.log(JSON.stringify(data));
          

    const response = {
      status: 'success',
      body: resNote,
    };

    // console.log(response);
    // res.json(response);
  }
});
    //   res.json(`note for ${response.data.notes} has been added!`);
    // } else {
    //   res.json('Request body must at least contain a note name');
    // };
    })}})};


    
