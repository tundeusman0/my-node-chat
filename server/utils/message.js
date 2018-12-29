let generateMessage = (fromm,text) =>({fromm,text,createdAt:new Date().getTime()})
const generateLocationMessage = (mssg,lat,lng) =>({
        mssg,
        url: `http://www.google.com/maps?q=loc:${lat},${lng}`,
        createdAt:new Date().getTime()
    })


module.exports = { generateMessage, generateLocationMessage}