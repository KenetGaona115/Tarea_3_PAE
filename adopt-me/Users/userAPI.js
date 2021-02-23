const users = require('../data/userdata.json');

function getData() {
    return users;
}

function getUserById(id){
    return users.find(user => user.id == id)
}

function deleteUser(id){
    const userToDelete = getUserById(id)
    console.log(userToDelete);
    users.splice(users.indexOf(userToDelete), users.indexOf(userToDelete) + 1)
    console.log("Usuario borrado")
    return userToDelete
}

function updateUser(id,fullname,age){
    getUserById(id).fullName = fullname
    getUserById(id).age = age
    console.log("Usuario actualizado")
    return getUserById(id)
}

function createUser(fullname,age){
    users.push({
        id:users.length+1,
        fullName: fullname,
        age: age
    })

    console.log("Usuario creado")
    return getUserById(users.length)
}

module.exports ={
    getUserById : getUserById,
    deleteUser : deleteUser,
    updateUser : updateUser,
    createUser : createUser,
    getData: getData,
}