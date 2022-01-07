/**
 * Contains API endpoints called by clients and sends requests to the server
 */

const axios = require('axios');
const WebSocket = require('ws');
 
// opens a new socket to the localhost
function createMessagingSocket() {
  return new WebSocket("ws://localhost:3002/messages");
}

function getMessages() {
  return axios.get('http://localhost:3002/messages').then(res => res.data);
}

function postMessages(mesage) {
  return axios.post('http://localhost:3002/message', message);
}

module.exports = {
  createMessagingSocket,
  getMessages,
  postMessages
}