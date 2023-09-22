const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    console.log('Here')
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password required!'});
    // check duplicate 
    const duplicate = userDB.users.find(person => person.user === user);
    if(duplicate) return res.sendStatus(409)
    try {
        console.log('HereTry')
        const hashPwd = await bcrypt.hash(pwd, 10);
        const newUser =  {"username": user , "pasword" : hashPwd };
        console.log('HereTry1',hashPwd, newUser)
        userDB.setUsers([...userDB.users, newUser]);
        console.log('HereTry2')
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.users)
        )
        console.log("UserDB",userDB.users);
        res.status(201).json({ 'success': `New user ${user} created`});
    } catch (err) {

    }
}

module.exports = { handleNewUser }