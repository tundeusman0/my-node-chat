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
    let li = document.createElement('li')
    let a = document.createElement('a')
    let linkText = document.createTextNode("My current location");
    li.innerHTML = `${message.mssg}`
    a.appendChild(linkText)
    a.setAttribute('target',"_blank")
    a.href = `${message.url}`
    li.appendChild(a)
    list.appendChild(li)
})