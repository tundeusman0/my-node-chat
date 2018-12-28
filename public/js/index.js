let socket = io();
socket.on('connect', function () {
    console.log('connected to server')
})

socket.on('disconnect', function () {
    console.log('disconnected from server')
})
socket.on('newMessage',(message)=>{
    console.log('newMessage', message)
    let li = document.createElement('li')
    li.innerHTML = `${message.fromm}: ${message.text} `
    list.appendChild(li)
})

button.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text:input.value
    },function(){

    })
})