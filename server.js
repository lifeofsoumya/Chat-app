const express = require('express');

const app = express()
const http = require('http').createServer(app)

app.use(express.static(__dirname + '/public'))

const port = process.env.PORT || 3000;

http.listen(port, ()=>{console.log(`Listening to port ${port}`)});

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

// Socket io setup
const io = require('socket.io')(http);

io.on('connection', (socket)=>{ // io is an instance of socket.io, the syntax is similar to addEventListener, which listens to event, then executes function
    socket.on('message', (msg)=>{ // the message is a custom event, the name will be later used in client.js
        socket.broadcast.emit('message', msg)
    })

// updating about new user -- 

    socket.on('newUser', (username)=>{
        socket.broadcast.emit('update', username + "joined the Chat")
    })

    socket.on('exitUser', (username)=>{
        socket.broadcast.emit('update', username + "left the Chat")
    })
})
