const fs = require("fs"); //fs = File system
const chalk = require("chalk");

const getNotes = function() {
  return "Your notes...";
};

//Adding the Notes

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("Notes added.."));
  } else {
    console.log(chalk.red.inverse("Warning duplicate Note. No title added"));
  }
};

//Removing the Notes

const removeNote = argvTitle => {
  const notes = loadNotes();
    /*
    By andrew :
    const notesToKeep = notes.filter(function(note) {
        return note.title != title; //return true if it isnot a match
    })

    if(notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen(`${argvTitle} removed.`));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed(`No items of ${argvTitle} title found.\n\n`));
    }

  
    */



  //let argvTitle = title in command line
  //let notes.title = title in json file

  const index = notes.findIndex(function(obj) {
    //returns index if found else -1
    return obj.title === argvTitle;
  });

  if (index != -1) {
    //console.log(notes[index].title)
    notes.splice(index, 1);
    console.log(notes);

    saveNotes(notes);
    console.log(chalk.green.inverse(`${argvTitle} removed.`));


  } else {
    console.log(chalk.red.inverse(`No items of ${argvTitle} title found.\n\n`));
  }
};



const saveNotes = function(notes) {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};



const loadNotes = function() {
  try {

    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON); //converts the JSON text/ string to JS object
  } catch (e) {

    return [];

  }
};





module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
