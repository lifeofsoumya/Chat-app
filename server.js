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

io.on('connection', (socket)=>{
    console.log('socket is on bruh!')
})