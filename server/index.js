const express = require("express");
const http = require("http");
const cors = require("cors");
const {Server} = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        method:["GET","POST"],
    },
})

io.on("connection",(socket)=>{
    console.log("User Connected: ",socket.id);
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`user with id : ${socket.id} joined room ${data}`)
    })
    socket.on("send_message",(data)=>{
        console.log(data);
        socket.to(data.room).emit("receive_message",data)
    })
    socket.on("disconnect",()=>{
        console.log("User Disconnected: ",socket.id)
    })
})

server.listen(3001,()=>{
    console.log("SERVER RUNNING");
});
