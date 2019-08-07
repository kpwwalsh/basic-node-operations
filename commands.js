const fs = require("fs");

function done(output) {
   process.stdout.write(output);
   process.stdout.write('\nprompt > ');
 }


function evaluateCmd(userInput) {
   const userInputArray = userInput.split(" ");
   const command = userInputArray[0];

   switch (command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      commandLibrary.errorHandler();
  }
 }

 const commandLibrary = {
    "echo": function(userInput) {
        done(userInput);
    },
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