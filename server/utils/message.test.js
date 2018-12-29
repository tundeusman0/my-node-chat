const expect = require('expect')
const { generateMessage, generateLocationMessage} = require('./message')

let fromm = 'tunde'
describe('generate message',()=>{
    it('should return correct message object',()=>{
        let text= 'this is from tunde';
        let message  = generateMessage(fromm,text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({fromm})
    })
})

describe('generate location message',()=>{
    it('should return correct geoLocation message',()=>{
        geolat = 6.52
        geolog = 3.37
        let geoMessage = generateLocationMessage(fromm,geolat,geolog)
        expect(typeof geoMessage.createdAt).toBe('number')
        expect(geoMessage.url).toMatch(`http://www.google.com/maps?q=loc:6.52,3.37`)
    })
})