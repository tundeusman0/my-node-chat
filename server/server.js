const express = require('express')
const socketIo = require('socket.io')

const { generateMessage, generateLocationMessage } = require('./utils/message')
const { isRealString } = require('./utils/validation')
const {User} = require('./utils/users')

const path = require('path')
const http = require('http')

const publicPath = path.join(__dirname,'/../public')
const port = process.env.PORT || 3000

let app = express();
let server = http.createServer(app)
let io = socketIo(server)
let users = new User()

app.use(express.static(publicPath))


io.on('connection',(socket)=>{
    console.log('New user connected');
    
    socket.on('join',(params,callback)=>{
        (!isRealString(params.name) || !isRealString(params.room))&&
        callback('Name and Room name required');
        socket.join(params.room)
        users.removeUser(socket.id)
        users.addUser(socket.id,params.name,params.room)

        io.to(params.room).emit('updateUserList',users.getUserList(params.room))
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App'))
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined`))
        callback()
    })
    socket.on('createMessage',(message,callback)=>{
        let user = users.getUser(socket.id)
        if(user && isRealString(message.text)){
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback()
    })
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id)
        io.to(user.room).emit('newLocationMessage', generateLocationMessage(`${user.name}`, coords.latitude, coords.longitude ))
    })
    
    socket.on('disconnect', () => {
        let user = users.removeUser(socket.id)
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room))
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`))
        }
    })
})



server.listen(port,()=>{
    console.log(`app has started ${port}`)
})