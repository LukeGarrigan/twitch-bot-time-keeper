const tmi = require('tmi.js');
const myOptions = require('./api-options');

var client = new tmi.client(myOptions);
client.connect();


client.on('connected', function (address, port) {
  console.log("Address: " + address);
  console.log("Port: " + port);
  client.action("codeheir", "hello");
  let previouslySentMessages = [];
  while (true) {
    var date = new Date();
    if (date.getMinutes() === 15 || date.getMinutes() === 30 || date.getMinutes() === 45 || date.getMinutes() === 0) {
      var message = getMessage(date);
      displayTimeMessage(previouslySentMessages, message);
    }
  }

});


function getMessage(date) {
  return "It's " + date.getHours() + ":" + date.getMinutes();
}

function displayTimeMessage(previouslySentMessages, message) {
  if (notAlreadyBeenSaid(message, previouslySentMessages)) {
    client.action("codeheir", message);
    previouslySentMessages.push(message);
  }
}
function notAlreadyBeenSaid(message, previouslySentMessages) {
  for (const previousMessage of previouslySentMessages) {
    if (message === previousMessage) {
      return false;
    }
  }
  return true;
}



