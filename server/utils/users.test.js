const expect = require('expect')
const {User} = require('./users')

describe('Users',()=>{
    let users;
    beforeEach(()=>{
        users = new User();
        users.users = [{
            id: '1',
            name: 'mike',
            room: "office"
        }, {
                id: '2',
                name: 'john',
                room: "office"
            }, {
                id: '3',
                name: 'kale',
                room: "oja"
            }]
    })
    it('should add new users',()=>{
        let users = new User();
        let user = {
            id: 123,
            name: 'tunde',
            room: 'office'
        } 
        let resUser = users.addUser(user.id,user.name,user.room)
        expect(users.users.length).toBe(1)
        expect(users.users).toEqual([user])
    })
    it('should remove a user', () => {
        let removeUser = users.removeUser('2')
        expect(users.users.length).toBe(2)
    })
    it('should not remove a user',()=>{
        let removeUser = users.removeUser('r')
        expect(users.users.length).toBe(3)
    })
    it('should find user',()=>{
        let findUser = users.getUser('3')
        expect(findUser.id).toBe('3')
        expect(findUser).toEqual(users.users[2])
    })
    it('should not find user', () => {
        let findUser = users.getUser('y')
        expect(findUser).toBeFalsy()
    })
    it('should return users with the same room',()=>{
        let userList = users.getUserList('office')
        expect(userList).toEqual(['mike', 'john'])
    })
    
})