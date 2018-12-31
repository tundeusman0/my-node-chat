const {isRealString} =require('./validation')
const expect = require('expect')

describe('isRealString',()=>{
    it('should return true for string with spaces',()=>{
        let str = ' this is a string '
        let res = isRealString(str)
        expect(res).toBe(true)
    })
    it('should return false for non-string', () => {
        let res = isRealString('')
        expect(res).toBe(false)
    })
})