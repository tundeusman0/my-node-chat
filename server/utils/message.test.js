const expect = require('expect')
const {generateMessage} = require('./message')

describe('generate message',()=>{
    it('should return correct message object',()=>{
        let fromm = 'tunde' 
        let text= 'this is from tunde';
        let message  = generateMessage(fromm,text)

        expect(typeof message.createdAt).toBe('number')
        expect(message).toMatchObject({fromm})
    })
})