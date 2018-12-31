class User {
    constructor(){
        this.users = []
    }
    addUser(id,name,room){
        let user = ({id,name,room})
        this.users.push(user)
        return user
    }
    removeUser(id){
        let user = this.getUser(id)
        if (user){
            let ind = this.users.findIndex((user) => user.id === id)
            this.users.splice(ind, 1)
        }
        return user
    }
    getUser(id){
        return this.users.filter((user)=>user.id === id)[0]
    }
    getUserList(room){
        let users =  this.users.filter((users)=>users.room === room)
        let namesArray = users.map((user)=>user.name)
        return namesArray
    }
}


module.exports = {User}