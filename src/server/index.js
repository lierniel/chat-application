import path from "path";
import http from "http";
import express from "express";
import socketio from 'socket.io';
import { addUser, removeUser, getUser, getUsersInRoom } from './models/users';

import router from './router';
import {addMessage, getMessagesByRoom} from "./models/messages";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use("/static", express.static(path.resolve(__dirname, "public")));
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if(error) return callback(error);

    socket.join(user.room);

    addMessage({ room: user.room, text: `${user.name} has joined!`, date: new Date(), isService: true});

    socket.broadcast.to(user.room).emit('message', { text: `${user.name} has joined!`, date: new Date(), isService: true});

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback(null, getMessagesByRoom(user.room));
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    addMessage({room: user.room, user: user.name, text: message, date: new Date});

    io.to(user.room).emit('message', { user: user.name, text: message, date: new Date()});

    callback();
  });


  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      addMessage({room: user.room, text: `${user.name} has left.`, date: new Date(), isService: true});
      io.to(user.room).emit('message', {text: `${user.name} has left.`, date: new Date(), isService: true});
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
  })
});

server.listen(process.env.PORT || 3000, () => console.log(`Server has started.`));