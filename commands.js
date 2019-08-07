const fs = require("fs");

//write out data
 function done(output) {
     process.stdout.write(output);
     process.stdout.write('\nprompt > ');
 }

//where we will store our commands
 function evaluateCmd(userInput) {
  //parses the user input to understand which command was typed
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":
     //we will add the functionality of echo next within the object commandLibrary    
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
      case "cat":
        commandLibrary.cat(userInputArray.slice(1));
        break;
      case "head":
        commandLibrary.head(userInputArray.slice(1).join(""));
        break;
      case "tail":
        commandLibrary.head(userInputArray.slice(1).join(""));
        break;
      default:
        commandLibrary.errorHandler();
  }
 }

//where we will store the logic of our commands
 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
    //the cat command
    "cat": function(fullPath) {
         const fileName = fullPath[0];
         fs.readFile(fileName, (err, data) => {
             if (err) throw err;
             done(data);
         });
     },
     "head": (fullPath)=>{
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           const n = 5;
           let text = data.toString('utf8');
           let slicedText = text.split('\n').slice(0,5).join('\n');
           let bufferText = Buffer.from(slicedText, 'utf8');
           done(bufferText);
        })
     },
     "tail": (fullPath)=>{
        const fileName = fullPath[0];
        fs.readFile(fileName, (err, data) => {
           if (err) throw err;
           const n = 5;
           let text = data.toString('utf8');
           let slicedText = text.split('\n').slice(-5).join('\n');
           let bufferText = Buffer.from(slicedText, 'utf8');
           done(bufferText);
          })
       },
     'errorHandler': () => {
        const error = "Incorrect command";
        done(error);
     }
 };

 module.exports.commandLibrary = commandLibrary;
 module.exports.evaluateCmd = evaluateCmd;