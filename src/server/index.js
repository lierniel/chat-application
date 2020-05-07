import express from 'express'
import path from "path";
import router from "./router";
import http from "http";
import socketio from "socket.io"


const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use("/static", express.static(path.resolve(__dirname, "public")));
app.use(router);


server.listen(process.env.PORT || 3000, () => console.log('Server has started'));