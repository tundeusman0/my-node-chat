let generateMessage = (fromm,text) =>({fromm,text,createdAt:new Date().getTime()})

module.exports = {generateMessage}