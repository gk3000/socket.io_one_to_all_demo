const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// creating a new instance of socket.io by passing the server(http) object
const { Server } = require("socket.io");
const io = new Server(
	server,
	{cors: {
		origin: "*"
	}}
	);

// defining port to be used by socket.io
io.listen(4000);

// if we want to do something on connection of each client
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// sending data to all the clients every second
io.on('connection', (socket) => {
	setInterval(() => {
		socket.emit('fromServer', new Date());
	}, 1000);
});


require("dotenv").config();
const PORT = process.env.PORT || 4545;

server.listen(PORT, () => {
	console.log(`Server is listening on ${PORT}`);
});