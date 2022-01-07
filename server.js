/**
 * Process messages from the UI and opens socket to listen to messages
 */

const messages = [{ id: 0, text: "hello", username: "bob" }];
const sockets = [];

const express = require('express');
const expressWS = require('express-ws');

const app = express();
expressWS(app); // enables our server to have a socket

app.use(express.json());

// listen on port 3002
app.listen(3002, () => {
  console.log("Listening on port 3002!");
});

app.get("/messages", (req, res) => {
  res.json(messages);
});

// post message 
app.post("/message", (req, res) => {
  const msg = req.body;
  messages.push(msg);

  // send the message to every socket that's connected
  for (const socket of sockets) {
    socket.send(JSON.stringify(msg));
  }
});

app.ws("/messages", (socket) => {
  sockets.push(socket);
  
  socket.on('close', () => {
    sockets.splice(sockets.indexOf(socket, 1));
  });
});