/* connect to MongoDB*/
const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string  
const PASSWORD = "root"
const url = `mongodb+srv://root:${PASSWORD}@cluster0.ju1yy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = "DB_Tarea4";
const collectionName = "Usuarios"
client.connect();

function getAllUsers() {
    return console.log(client.db(dbName).collection(collectionName).find())
}

function createUser(name, email, picture) {
    const User = {
        name: name,
        email: email,
        picture: picture,
    };
    client.db(dbName).collection(collectionName).insertOne(User)
    getAllUsers();
}

function getUserByEmail(email) {

    const User = client.db(dbName).collection(collectionName).findOne(
        { email: email }
    );
    return user;
}

function deleteUserByEmail(email) {
    client.db(dbName).collection(collectionName).deleteOne({ email: email})
    console.log('Usuario eliminado')
}

module.exports = {
    getAllUsers: getAllUsers,
    createUser: createUser,
    getUserByEmail: getUserByEmail,
    deleteUserByEmail: deleteUserByEmail
}