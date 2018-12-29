const moment = require('moment')
let generateMessage = (fromm,text) =>({fromm,text,createdAt:moment().valueOf()})
const generateLocationMessage = (mssg,lat,lng) =>({
        mssg,
        url: `http://www.google.com/maps?q=loc:${lat},${lng}`,
        createdAt: moment().valueOf()
    })


module.exports = { generateMessage, generateLocationMessage}