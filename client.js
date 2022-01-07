/**
 * Reads commands from terminal and executes API requests
 */
const helpers = require('./helpers');
const messageAPI = require('./messaging_api');
const readline = require('readline');

// keep track of messages that have already been displayed
const displayedMessages = {};

const terminal = readline.createInterface({
  input: process.stdin
});

terminal.on('line', text => {

  // send the message to server via the API
  const username = process.env.NAME;
  const id = helpers.getRandomInt(1000);

  displayedMessages[id] = true;

  message = { id, username, text };
  messageAPI.postMessages(message);

});

function displayMessage(message) {

  const { username, id, text } = message;
    displayMessage[id] = true;
    console.log(`> ${username}: ${text}`);
}

async function getAndDisplayMessages() {
  const messages = await messageAPI.getMessages();
  for (message of messages) {
    if (!displayMessage[message.id]) displayMessage(message);
  }
}

// get message and display it every 3 seconds
function pollMessages() {
  setInterval(getAndDisplayMessages, 3000);
}

function streamMessages() {
  // create socket
  const socket = messageAPI.createMessagingSocket();
  socket.on('message', data => {
    const msg = JSON.parse(data);
    if (!displayMessage[msg.id]) displayMessage(msg);
  });
}

if (process.env.MODE === "poll") {
  getAndDisplayMessages();
  pollMessages();
} else if (process.env.MODE === "stream") {
  getAndDisplayMessages();
  streamMessages();
}