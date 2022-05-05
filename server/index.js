import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";


const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });
const port = process.env.PORT || 3000;



io.on("connection", (socket) => {
    
    //when client emits 'new message', this listens and executes
    socket.on("new message", (data) => {
        console.log(data);
        // we tell the client to execute 'new message'
        socket.broadcast.emit("new message", {
            username: socket.username,
            message: data
        })
    })

});

httpServer.listen(port, (err) => {
    if(err) throw console.error(err);
    console.log('Server listening at port %d', port)
});