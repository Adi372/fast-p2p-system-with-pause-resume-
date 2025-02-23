const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('offer', (data) => {
        io.to(data.target).emit('offer', { 
            offer: data.offer, 
            sender: socket.id 
        });
    });

    socket.on('answer', (data) => {
        io.to(data.target).emit('answer', { 
            answer: data.answer 
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(3000, () => {
    console.log('Signaling server running on port 3000');
});
