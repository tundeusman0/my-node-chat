let socket = io();
socket.on('connect', function () {
    console.log('connected to server')
    socket.emit('createMessage',{
        from:'tunde',
        text:'from me'
    })
})

socket.on('disconnect', function () {
    console.log('disconnected from server')
})
socket.on('newMessage',(message)=>{
    console.log('isokay', message)
})