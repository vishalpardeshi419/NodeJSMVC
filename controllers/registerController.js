const User = require('../model/User')
const bcrypt = require('bcrypt')

const fsPromises = require('fs').promises;
const path = require('path');

const handleNewUser = async (req, res) => {
    console.log('Here')
    const { user, pwd } = req.body;
    if(!user || !pwd) return res.status(400).json({'message': 'Username and password required!'});
    // check duplicate 
    const duplicate = await User.findOne({ username: user}).exec();
    if(duplicate) return res.sendStatus(409)
    try {
        const hashPwd = await bcrypt.hash(pwd, 10);
        const result =  await User.create({
        "username": user,
        "pasword" : hashPwd 
        });

        // Alternative to save
        // const newUser = new User();
        // const result =  await newUser.save();

        console.log('resutl', result)
        
        res.status(201).json({ 'success': `New user ${user} created`});
    } catch (err) {

    }
}

module.exports = { handleNewUser }