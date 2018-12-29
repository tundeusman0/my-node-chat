// 
let socket = io();
socket.on('connect', function () {
    console.log('connected to server')
})

socket.on('disconnect', function () {
    console.log('disconnected from server')
})
socket.on('newMessage',(message)=>{
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let template = document.querySelector('#message-template').innerHTML
    let html = Mustache.render(template,{
        text: message.text,
        from: message.fromm,
        createdAt: formattedTime
    })
    let li = document.createElement('li')
    li.innerHTML = html
    list.appendChild(li)

})

button.addEventListener('click', (e) => {
    e.preventDefault()
    socket.emit('createMessage',{
        from:'User',
        text:input.value
    },function(){
        input.value = ''
    })
})

locationButton.addEventListener('click',()=>{
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.')
    }
    locationButton.disabled = true && 
    (locationButton.innerHTML = 'Sending location ...')

    navigator.geolocation.getCurrentPosition(function(position){
        locationButton.innerHTML = 'Send location'
        locationButton.disabled = false
        socket.emit('createLocationMessage',{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        })
    },function(){
        locationButton.disabled = true
        locationButton.innerHTML = 'Send location'
        alert('Unable to fetch location')
    })
})
socket.on('newLocationMessage',function(message){
    let formattedTime = moment(message.createdAt).format('h:mm a')
    let template = document.querySelector('#location-message-template').innerHTML
    let html = Mustache.render(template, {
        from: message.mssg,
        url: message.url,
        createdAt: formattedTime
    })
    let li = document.createElement('li')
    li.innerHTML = html
    list.appendChild(li)
})