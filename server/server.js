const express = require('express')
const socketIo = require('socket.io')

const path = require('path')
const http = require('http')

const publicPath = path.join(__dirname,'/../public')
const port = process.env.PORT || 3000

let app = express();
let server = http.createServer(app)
let io = socketIo(server)

app.use(express.static(publicPath))


io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.emit('newMessage',{
        from:'Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage',{
        from:'Admin',
        text:'New user joined',
        createdAt: new Date().getTime()
    })
    socket.on('createMessage',(message)=>{
        console.log('create message',message)
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt:new Date().getTime()
        })
    })
    
    socket.on('disconnect', () => {
        console.log('User Disconnected')
    })
})



server.listen(port,()=>{
    console.log(`app has started ${port}`)
})