const fs = require("fs"); //fs = File system
const chalk = require("chalk");


//Adding the Notes

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);


    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        });
    
        saveNotes(notes);
        console.log(chalk.green.inverse("Notes added.."));

    }    else {
        console.log(chalk.red.inverse("Warning duplicate Note. No title added"));
    }
};

//Removing the Notes

const removeNote = (argvTitle) => {
  const notes = loadNotes();
    /*
    By andrew :
    const notesToKeep = notes.filter((note) =>  note.title != title) //return true if it isnot a match

    if(notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen(`${argvTitle} removed.`));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.bgRed(`No items of ${argvTitle} title found.\n\n`));
    }
 
    */

  //let argvTitle = title in command line
  //let notes.title = title in json file


  //returns index if found else -1
  const index = notes.findIndex((obj) =>  obj.title === argvTitle);


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



//Listing the Notes

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse("Your notes titles : "));

    notes.forEach(element => {
  
        console.log(element.title);
        
    });
}



//Read title and display full info about nodes

const readNotes = (argvTitle)  => {
    const notes = loadNotes();

    const notestoRead = notes.find(ele =>  ele.title === argvTitle)

    if(notestoRead) {

        console.log(chalk.inverse.green(`Title => ${notestoRead.title}\n`));

        console.log(chalk.inverse.yellow(`Body => ${notestoRead.body}\n`));
        
    }   else {
        console.log(chalk.inverse.red("Notes not found !"))
    }

}





const saveNotes = (notes) =>  {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};



const loadNotes = () => {
  try {

    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();

    return JSON.parse(dataJSON); //converts the JSON text/ string to JS object
  } catch (e) {

    return [];

  }
};





module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes : listNotes,
  readNotes : readNotes
};
